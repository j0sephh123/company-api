import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CompanySeeder } from "./data/seeders/CompanySeeder.js";
import { MESSAGES } from "./constants/messages.js";
import "dotenv/config";
import { createCompanyRepository } from "./domain/company/repositories/companyFactory.js";

if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined");
}

const companyRepo = createCompanyRepository();

const app = new Hono()
  .get("/", (c) => {
    return c.text(MESSAGES.HELLO);
  })
  .get("/companies", (c) => {
    const companies = companyRepo.getAllCompanies();
    return c.json(companies);
  })
  .post("/seed", async (c) => {
    new CompanySeeder().seed();
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

export default app;
