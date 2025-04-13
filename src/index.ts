import { serve } from "@hono/node-server";
import { Hono } from "hono";
import DatabaseSingleton from "./db.js";
import { CompanySeeder } from "./seeders/CompanySeeder.js";
import { SqlQueryBuilder } from "./utils/SqlQueryBuilder.js";
import { MESSAGES } from "./constants/messages.js";
import "dotenv/config";

if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined");
}

export const app = new Hono();
const db = DatabaseSingleton.getInstance();
const queryBuilder = SqlQueryBuilder.getInstance();

app.get("/", (c) => {
  return c.text(MESSAGES.HELLO);
});

app.get("/companies", (c) => {
  const companies = queryBuilder.getAllCompanies(db.getDb());
  return c.json(companies);
});

app.post("/seed", async (c) => {
  await new CompanySeeder().seed();
  return c.json({ message: MESSAGES.SEED_SUCCESS });
});

if (process.env.NODE_ENV !== "test") {
  const port = parseInt(process.env.PORT);
  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    }
  );
}
