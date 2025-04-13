import { Hono } from "hono";
import { MESSAGES } from "../constants/messages.js";

const indexRoutes = new Hono();

indexRoutes.get("/", (c) => {
  return c.text(MESSAGES.HELLO);
});

export default indexRoutes;
