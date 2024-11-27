import { Hono } from "https://deno.land/x/hono/mod.ts";

const app = new Hono();
const projects: Record<string, any> = {};

// Create Project
app.post('/projects', async (c) => {
  const project = await c.req.json();
  const id = crypto.randomUUID();
  projects[id] = { ...project, id };
  return c.json({ message: "Project created", project });
});

// Get All Projects
app.get('/projects', (c) => {
  return c.json({ projects });
});

// Start the service
app.listen({ port: 8002 });
console.log("Project Service running on http://localhost:8002");
