import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import companiesRoutes from "./routes/companies.routes.js";
import indexRoutes from "./routes/index.routes.js";
import seedRoutes from "./routes/seed.routes.js";

if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined");
}

const app = new Hono()
  .route("/", indexRoutes)
  .route("/companies", companiesRoutes)
  .route("/seed", seedRoutes);

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
