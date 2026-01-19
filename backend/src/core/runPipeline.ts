import { prisma } from "../lib/prisma";
import { RunStatus } from "@prisma/client";
import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { generateGeminiInsights } from "./ai/gemini.service";

// CHANGED: We now accept runId because the record is created BEFORE this runs
type RunPipelineOptions = {
  projectId: string;
  runId: string;
};

type ExecResult = {
  stdout: string;
  stderr: string;
  code: number;
};

type Stack = "node" | "unknown";

// ---------- Helpers ----------

function execAsync(command: string, opts: { cwd: string }): Promise<ExecResult> {
  return new Promise((resolve) => {
    const child = exec(
      command,
      { cwd: opts.cwd, maxBuffer: 10 * 1024 * 1024 }, // 10MB buffer
      (error, stdout, stderr) => {
        const code = (error as any)?.code ?? 0;
        resolve({ stdout, stderr, code });
      }
    );
  });
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function detectStackAndTestCommand(projectDir: string): {
  stack: Stack;
  testCommand: string | null;
} {
  const pkgPath = path.join(projectDir, "package.json");

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const hasTestScript = pkg.scripts && pkg.scripts.test;

    return {
      stack: "node",
      testCommand: hasTestScript ? "npm test -- --coverage" : "npx jest --coverage"
    };
  }

  return { stack: "unknown", testCommand: null };
}

function parseTestOutput(output: string): {
  coverage: number | null;
  passed: number | null;
  failed: number | null;
} {
  let coverage: number | null = null;
  // Jest simple coverage regex
  const covMatch = output.match(/All files[\s\S]*?(\d{1,3}\.?\d*)\s*%?/);
  if (covMatch) {
    coverage = parseFloat(covMatch[1]);
  }

  let passed: number | null = null;
  let failed: number | null = null;

  // Jest test summary regex
  const testsMatch = output.match(/Tests:\s+(\d+)\s+passed.*?(\d+)\s+failed/);
  if (testsMatch) {
    passed = parseInt(testsMatch[1], 10);
    failed = parseInt(testsMatch[2], 10);
  }

  return { coverage, passed, failed };
}

function inferStackFromTestCommand(testCommand: string | null): Stack {
  if (!testCommand) return "unknown";
  if (/npm\s+|node\s+|jest\s+/.test(testCommand)) return "node";
  return "unknown";
}

// ---------- Main pipeline ----------

export async function runPipeline({ projectId, runId }: RunPipelineOptions) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    throw new Error("Project not found");
  }

  const workspaceRoot = path.join(process.cwd(), "workspace");
  ensureDir(workspaceRoot);

  const projectDir = path.join(workspaceRoot, projectId);
  const repoUrl = project.repoUrl;

  // Helper to update the run status safely
  const updateRun = async (data: any) => {
    await prisma.testRun.update({
      where: { id: runId },
      data
    });
  };

  // 1) Clone or pull repo
  let cloneOrPullOutput = "";
  try {
    if (!fs.existsSync(projectDir) || !fs.existsSync(path.join(projectDir, ".git"))) {
      const { stdout, stderr } = await execAsync(`git clone ${repoUrl} "${projectDir}"`, {
        cwd: workspaceRoot
      });
      cloneOrPullOutput = stdout + "\n" + stderr;
    } else {
      const { stdout, stderr } = await execAsync("git pull", { cwd: projectDir });
      cloneOrPullOutput = stdout + "\n" + stderr;
    }
  } catch (e) {
    const errText = (e as any)?.toString?.() ?? "Unknown error during git operation";
    
    // Fail early by updating the record
    return updateRun({
        status: RunStatus.ERROR,
        rawOutput: cloneOrPullOutput + "\n" + errText,
        summary: "Git clone/pull failed. Check repository URL and access.",
        suggestions: [
          "Verify that the repo URL is correct and public or accessible with your git credentials.",
          "Make sure Git is installed and available in PATH on this machine."
        ],
        finishedAt: new Date()
    });
  }

  // 2) Determine testCommand + stack
  let testCommand: string | null = project.testCommand || null;
  let stack: Stack | null = (project.stack as Stack | null) ?? null;

  // Auto-detect if missing
  if (!testCommand && !stack) {
    const detected = detectStackAndTestCommand(projectDir);
    testCommand = detected.testCommand;
    stack = detected.stack;

    // Save detection to project for future
    await prisma.project.update({
      where: { id: projectId },
      data: {
        stack: stack === "unknown" ? null : stack,
        testCommand
      }
    });
  }

  // Fail if no command
  if (!testCommand) {
    return updateRun({
      status: RunStatus.ERROR,
      rawOutput: cloneOrPullOutput,
      summary: "No testCommand configured for this project.",
      suggestions: [
          "Provide a testCommand when creating the project (e.g. 'npm test -- --coverage').",
          "For monorepos, prefix with 'cd backend && ...' or 'cd api && ...'."
      ],
      finishedAt: new Date()
    });
  }

  if (!stack) {
    stack = inferStackFromTestCommand(testCommand);
  }

  // 3) Install dependencies (Node only)
  let installOutput = "";
  if (stack === "node") {
    // Optional: You could update status to "INSTALLING" here if you added that status
    const { stdout, stderr } = await execAsync("npm install", { cwd: projectDir });
    installOutput = stdout + "\n" + stderr;
  }

  // 4) Run tests
  const { stdout: testStdout, stderr: testStderr, code } = await execAsync(testCommand, {
    cwd: projectDir
  });
  const testOutput = testStdout + "\n" + testStderr;

  // 5) Parse results
  const parsed = parseTestOutput(testOutput);
  const status = code === 0 ? RunStatus.PASSED : RunStatus.FAILED;

  const baseSummaryLines = [
    `Test run exited with code ${code}.`,
    parsed.coverage !== null ? `Approx coverage: ${parsed.coverage.toFixed(2)}%.` : "Coverage could not be parsed.",
    parsed.passed !== null || parsed.failed !== null
      ? `Tests passed: ${parsed.passed ?? "?"}, failed: ${parsed.failed ?? "?"}.`
      : "Test counts could not be parsed."
  ];

  let finalSummary = baseSummaryLines.join(" ");
  let finalSuggestions: string[] = [
    "Review the raw test output to identify failing tests.",
    "Improve test coverage by adding tests for untested modules.",
    "Consider running tests locally with verbose mode to reproduce failures."
  ];

  // 6) Gemini AI insights
  try {
    const ai = await generateGeminiInsights({
      rawOutput: testOutput,
      coverage: parsed.coverage,
      status
    });

    if (ai.summary) {
      finalSummary = ai.summary;
    }
    if (ai.suggestions && ai.suggestions.length > 0) {
      finalSuggestions = ai.suggestions;
    }
  } catch (e) {
    console.error("[Gemini] AI insights failed:", e);
  }

  // 7) Save Final Result (UPDATE existing run)
  const fullLog = [
    "--- GIT OPERATION ---", cloneOrPullOutput,
    "--- INSTALLATION ---", installOutput,
    "--- TEST OUTPUT ---", testOutput
  ].join("\n\n");

  await updateRun({
    status,
    coverage: parsed.coverage,
    testsPassed: parsed.passed,
    testsFailed: parsed.failed,
    rawOutput: fullLog,
    summary: finalSummary,
    suggestions: finalSuggestions,
    finishedAt: new Date()
  });

  // Update Project's lastRunId reference and status
  await prisma.project.update({
    where: { id: projectId },
    data: { 
        lastRunId: runId,
        status: "READY"
    }
  });

  return;
}