import { Router } from "express";
import { prisma } from "../lib/prisma";
import { TriggerType } from "@prisma/client";
import { runPipeline } from "../core/runPipeline";

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

// POST /api/projects/:id/run  (real pipeline – Node-only v1)
router.post("/:id/run", async (req, res) => {
  try {
    const { id: projectId } = req.params;

    // 404 if project doesn't exist
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const run = await runPipeline({
      projectId,
      triggerType: TriggerType.MANUAL
    });

    return res.status(201).json({
      data: run,
      message: "Test pipeline executed (Node-only v1)."
    });
  } catch (err) {
    console.error("Error running pipeline:", err);
    return res.status(500).json({ error: "Failed to run test pipeline" });
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
