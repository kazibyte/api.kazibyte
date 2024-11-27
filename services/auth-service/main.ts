import { Hono } from "https://deno.land/x/hono/mod.ts";

const app = new Hono();

// Simulated database
const users: Record<string, { password: string }> = {
  "john.doe@example.com": { password: "123456" },
};

// Login endpoint
app.post('/login', async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ message: "Missing email or password" }, 400);
  }

  const user = users[email];
  if (!user || user.password !== password) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  // Generate a fake token (in a real system, use JWT or similar)
  const token = btoa(email);
  return c.json({ message: "Login successful", token });
});

// Signup endpoint
app.post('/signup', async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ message: "Missing email or password" }, 400);
  }

  if (users[email]) {
    return c.json({ message: "User already exists" }, 409);
  }

  users[email] = { password };
  return c.json({ message: "User registered successfully" }, 201);
});

// Start the service
app.listen({ port: 8001 });
console.log("Auth Service running on http://localhost:8001");
