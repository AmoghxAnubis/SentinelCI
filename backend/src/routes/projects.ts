import { Router } from "express";
import { prisma } from "../lib/prisma";
import { TriggerType, RunStatus } from "@prisma/client"; 
import { runPipeline } from "../core/runPipeline";

const router = Router();

// POST /api/projects (UPDATED: Auto-Start Pipeline)
router.post("/", async (req, res) => {
  try {
    const { name, repoUrl, defaultBranch = "main", testCommand } = req.body;

    if (!name || !repoUrl) {
      return res.status(400).json({ error: "name and repoUrl are required" });
    }

    // 1. Create the Project (Status: PENDING_SETUP)
    const project = await prisma.project.create({
      data: {
        name,
        repoUrl,
        defaultBranch,
        testCommand: testCommand || null,
        status: "PENDING_SETUP"
      }
    });

    // 2. IMMEDIATE ACTION: Create the First Test Run
    const newRun = await prisma.testRun.create({
      data: {
        projectId: project.id,
        triggerType: TriggerType.AUTO_INITIAL, // Mark as initial run
        branch: defaultBranch,
        status: RunStatus.IN_PROGRESS,
        rawOutput: "Initializing first pipeline run...",
      }
    });

    // 3. Trigger the Pipeline in Background (Fire & Forget)
    runPipeline({
      projectId: project.id,
      runId: newRun.id
    }).catch(err => {
      console.error(`[Auto-Start] Pipeline crashed for project ${project.id}:`, err);
      // We don't need to update DB here, runPipeline handles its own error states
    });

    // 4. Return the project (Frontend will see it immediately)
    return res.status(201).json({ 
        data: project, 
        message: "Project created and pipeline started." 
    });

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

// POST /api/projects/:id/run  (ASYNC FIRE-AND-FORGET)
router.post("/:id/run", async (req, res) => {
  try {
    const { id: projectId } = req.params;

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const newRun = await prisma.testRun.create({
      data: {
        projectId,
        triggerType: TriggerType.MANUAL,
        branch: project.defaultBranch,
        status: RunStatus.IN_PROGRESS,
        rawOutput: "Initializing pipeline...",
      }
    });

    runPipeline({
      projectId,
      runId: newRun.id
    }).catch(err => {
      console.error(`[Background] Pipeline crashed for run ${newRun.id}:`, err);
    });

    return res.status(201).json({
      message: "Test pipeline started successfully.",
      runId: newRun.id,
      status: "IN_PROGRESS"
    });

  } catch (err) {
    console.error("Error triggering pipeline:", err);
    return res.status(500).json({ error: "Failed to trigger test pipeline" });
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