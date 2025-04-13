import { serve } from "@hono/node-server";
import { Hono } from "hono";
import DatabaseSingleton from "./db.js";
import { CompanySeeder } from "./seeders/CompanySeeder.js";

const app = new Hono();
const db = DatabaseSingleton.getInstance();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/companies", (c) => {
  const companies = db.getDb().prepare("SELECT * FROM companies").all();
  return c.json(companies);
});

app.post("/seed", (c) => {
  new CompanySeeder().seed();
  return c.json({ message: "Companies seeded successfully" });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
