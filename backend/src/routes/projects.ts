import { Router } from "express";
import { prisma } from "../lib/prisma";
import { RunStatus, TriggerType } from "@prisma/client";

const router = Router();

// POST /api/projects
router.post("/", async (req, res) => {
  try {
    const { name, repoUrl, defaultBranch = "main", testCommand } = req.body;

    if (!name || !repoUrl) {
      return res.status(400).json({ error: "name and repoUrl are required" });
    }

    const project = await prisma.project.create({
      data: {
        name,
        repoUrl,
        defaultBranch,
        testCommand: testCommand || null,
        status: "PENDING_SETUP"
      }
    });

    return res.status(201).json({ data: project, message: "Project created" });
  } catch (err) {
    console.error("Error creating project:", err);
    return res.status(500).json({ error: "Failed to create project" });
  }
});

// GET /api/projects
router.get("/", async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" }
    });
    return res.json({ data: projects });
  } catch (err) {
    console.error("Error listing projects:", err);
    return res.status(500).json({ error: "Failed to list projects" });
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json({ data: project });
  } catch (err) {
    console.error("Error fetching project:", err);
    return res.status(500).json({ error: "Failed to fetch project" });
  }
});

// POST /api/projects/:id/run  (dummy run for now)
router.post("/:id/run", async (req, res) => {
  try {
    const { id: projectId } = req.params;

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const randomPassed = Math.floor(Math.random() * 50) + 50; // 50-99
    const randomFailed = Math.floor(Math.random() * 5);
    const randomCoverage = 60 + Math.random() * 40; // 60-100

    const run = await prisma.testRun.create({
      data: {
        projectId,
        triggerType: TriggerType.MANUAL,
        branch: project.defaultBranch,
        status: randomFailed > 0 ? RunStatus.FAILED : RunStatus.PASSED,
        coverage: Number(randomCoverage.toFixed(2)),
        testsPassed: randomPassed,
        testsFailed: randomFailed,
        rawOutput: "Dummy test output. Replace with real test execution later.",
        summary: "Dummy run created. Integrate real repo execution + AI summary later.",
        suggestions: [
          "Integrate real git clone & test command runner.",
          "Parse actual coverage from test output.",
          "Call AI provider to generate real summaries."
        ]
      }
    });

    return res.status(201).json({ data: run, message: "Dummy test run created" });
  } catch (err) {
    console.error("Error creating dummy run:", err);
    return res.status(500).json({ error: "Failed to create test run" });
  }
});

// GET /api/projects/:id/runs
router.get("/:id/runs", async (req, res) => {
  try {
    const { id: projectId } = req.params;

    const runs = await prisma.testRun.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" }
    });

    return res.json({ data: runs });
  } catch (err) {
    console.error("Error listing runs:", err);
    return res.status(500).json({ error: "Failed to list test runs" });
  }
});

export default router;
