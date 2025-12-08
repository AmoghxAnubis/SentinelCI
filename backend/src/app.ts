import express from "express";
import cors from "cors";
import { config as loadEnv } from "dotenv";
import healthRouter from "./routes/health";
import projectsRouter from "./routes/projects";
import runsRouter from "./routes/runs";

loadEnv(); // loads .env

const app = express();

app.use(cors());
app.use(express.json());

// Root ping
app.get("/", (_req, res) => {
  res.json({ service: "SentinelCI backend", status: "ok" });
});

// Route groups
app.use("/api/health", healthRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/runs", runsRouter);

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
