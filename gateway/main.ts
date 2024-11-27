import { Hono } from "https://deno.land/x/hono/mod.ts";

const app = new Hono();

// Proxy to Authentication Service
app.route('/auth/*', async (c) => {
  const path = c.req.path.replace('/auth', '');
  const url = `http://localhost:8001${path}`;
  return fetch(url, {
    method: c.req.method,
    headers: c.req.headers,
    body: c.req.method !== 'GET' ? c.req.body : undefined,
  }).then(async (res) => c.json(await res.json(), res.status));
});

// Proxy to Project Service
app.route('/projects/*', async (c) => {
  const path = c.req.path.replace('/projects', '');
  const url = `http://localhost:8002${path}`;
  return fetch(url, {
    method: c.req.method,
    headers: c.req.headers,
    body: c.req.method !== 'GET' ? c.req.body : undefined,
  }).then(async (res) => c.json(await res.json(), res.status));
});

// Start the API Gateway
app.listen({ port: 8000 });
console.log("API Gateway running on http://localhost:8000");
