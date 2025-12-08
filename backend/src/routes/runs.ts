import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/runs/:runId
router.get("/:runId", async (req, res) => {
  try {
    const { runId } = req.params;

    const run = await prisma.testRun.findUnique({
      where: { id: runId }
    });

    if (!run) {
      return res.status(404).json({ error: "Test run not found" });
    }

    return res.json({ data: run });
  } catch (err) {
    console.error("Error fetching run:", err);
    return res.status(500).json({ error: "Failed to fetch test run" });
  }
});

export default router;
