// frontend/src/lib/api.ts

// CHANGED: Matches your server.ts default port (4000)
const API_BASE_URL = "http://localhost:4000/api";

export interface CreateProjectPayload {
  name: string;
  repoUrl: string;
  defaultBranch?: string;
  testCommand?: string;
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(payload: CreateProjectPayload) {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) {
    throw new Error("Failed to create project");
  }
  
  return res.json();
}