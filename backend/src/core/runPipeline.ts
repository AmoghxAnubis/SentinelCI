import { prisma } from "../lib/prisma";
import { RunStatus, TriggerType } from "@prisma/client";
import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

type RunPipelineOptions = {
  projectId: string;
  triggerType: TriggerType;
};

// Helper: promisified exec
function execAsync(command: string, opts: { cwd: string }): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    const child = exec(command, { cwd: opts.cwd, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      const code = (error as any)?.code ?? 0;
      resolve({ stdout, stderr, code });
    });
  });
}

// Helper: ensure directory exists
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Very simple stack detection (Node-only for now)
function detectStackAndTestCommand(projectDir: string): { stack: "node" | "unknown"; testCommand: string | null } {
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

// Very naive parsing: try to extract coverage and test counts from Jest-like output
function parseTestOutput(output: string): { coverage: number | null; passed: number | null; failed: number | null } {
  let coverage: number | null = null;

  // Look for patterns like "All files   |  85.71 |"
  const covMatch = output.match(/All files[\s\S]*?(\d{1,3}\.?\d*)\s*%?/);
  if (covMatch) {
    coverage = parseFloat(covMatch[1]);
  }

  let passed: number | null = null;
  let failed: number | null = null;

  // Jest-style summary: "Tests:       10 passed, 2 failed"
  const testsMatch = output.match(/Tests:\s+(\d+)\s+passed.*?(\d+)\s+failed/);
  if (testsMatch) {
    passed = parseInt(testsMatch[1], 10);
    failed = parseInt(testsMatch[2], 10);
  }

  return { coverage, passed, failed };
}

// MAIN PIPELINE
export async function runPipeline({ projectId, triggerType }: RunPipelineOptions) {
  // 1) Fetch project
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    throw new Error("Project not found");
  }

  // 2) Prepare workspace
  const workspaceRoot = path.join(process.cwd(), "workspace");
  ensureDir(workspaceRoot);

  const projectDir = path.join(workspaceRoot, projectId);
  const repoUrl = project.repoUrl;

  // 3) Clone or pull repo
  let cloneOrPullOutput = "";
  try {
    if (!fs.existsSync(projectDir) || !fs.existsSync(path.join(projectDir, ".git"))) {
      const { stdout, stderr } = await execAsync(`git clone ${repoUrl} "${projectDir}"`, { cwd: workspaceRoot });
      cloneOrPullOutput = stdout + "\n" + stderr;
    } else {
      const { stdout, stderr } = await execAsync(`git pull`, { cwd: projectDir });
      cloneOrPullOutput = stdout + "\n" + stderr;
    }
  } catch (e) {
    const errText = (e as any)?.toString?.() ?? "Unknown error during git operation";
    return prisma.testRun.create({
      data: {
        projectId,
        triggerType,
        branch: project.defaultBranch,
        status: RunStatus.ERROR,
        coverage: null,
        testsPassed: null,
        testsFailed: null,
        rawOutput: cloneOrPullOutput + "\n" + errText,
        summary: "Git clone/pull failed. Check repository URL and access.",
        suggestions: [
          "Verify that the repo URL is correct and public or accessible with your git credentials.",
          "Make sure Git is installed and available in PATH on this machine."
        ]
      }
    });
  }

  // 4) Detect stack & test command (Node only for now)
  let testCommand = project.testCommand || null;
  let stack = project.stack || null;

  if (!testCommand || !stack) {
    const detected = detectStackAndTestCommand(projectDir);
    stack = detected.stack;
    testCommand = testCommand || detected.testCommand;

    // Save back to project for next time
    await prisma.project.update({
      where: { id: projectId },
      data: {
        stack: stack === "unknown" ? null : stack,
        testCommand
      }
    });
  }

  if (!testCommand || stack === "unknown") {
    return prisma.testRun.create({
      data: {
        projectId,
        triggerType,
        branch: project.defaultBranch,
        status: RunStatus.ERROR,
        coverage: null,
        testsPassed: null,
        testsFailed: null,
        rawOutput: cloneOrPullOutput,
        summary: "Could not detect a supported stack or test command.",
        suggestions: [
          "Ensure the project has a package.json with a test script.",
          "Manually set a testCommand for this project via the API or your UI."
        ]
      }
    });
  }

  // 5) Install dependencies (for Node)
  let installOutput = "";
  if (stack === "node") {
    const { stdout, stderr } = await execAsync("npm install", { cwd: projectDir });
    installOutput = stdout + "\n" + stderr;
  }

  // 6) Run tests
  const { stdout: testStdout, stderr: testStderr, code } = await execAsync(testCommand, { cwd: projectDir });
  const testOutput = testStdout + "\n" + testStderr;

  const parsed = parseTestOutput(testOutput);
  const status = code === 0 ? RunStatus.PASSED : RunStatus.FAILED;

  const summaryLines = [
    `Test run exited with code ${code}.`,
    parsed.coverage !== null ? `Approx coverage: ${parsed.coverage.toFixed(2)}%.` : "Coverage could not be parsed.",
    parsed.passed !== null || parsed.failed !== null
      ? `Tests passed: ${parsed.passed ?? "?"}, failed: ${parsed.failed ?? "?"}.`
      : "Test counts could not be parsed."
  ];

  // 7) Save TestRun
  const run = await prisma.testRun.create({
    data: {
      projectId,
      triggerType,
      branch: project.defaultBranch,
      status,
      coverage: parsed.coverage,
      testsPassed: parsed.passed,
      testsFailed: parsed.failed,
      rawOutput: [cloneOrPullOutput, installOutput, testOutput].join("\n\n---\n\n"),
      summary: summaryLines.join(" "),
      suggestions: [
        "Review the raw test output to identify failing tests.",
        "Improve test coverage by adding tests for untested modules.",
        "Later: plug in the AI module to get smarter, file-specific suggestions."
      ]
    }
  });

  // Optionally update lastRunId
  await prisma.project.update({
    where: { id: projectId },
    data: { lastRunId: run.id }
  });

  return run;
}
