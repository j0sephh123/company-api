import { Hono } from "hono";
import { MESSAGES } from "../constants/messages.js";
import { CompanySeeder } from "../data/seeders/CompanySeeder.js";

const seedRoutes = new Hono();

seedRoutes.post("/", async (c) => {
  new CompanySeeder().seed();
  return c.json({ message: MESSAGES.SEED_SUCCESS });
});

export default seedRoutes;
