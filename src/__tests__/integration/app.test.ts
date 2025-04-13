import { testClient } from "hono/testing";
import app from "../../index.js";
import { MESSAGES } from "../../constants/messages.js";

describe("App", () => {
  const client = testClient(app);

  describe("GET /", () => {
    test("should return hello message", async () => {
      const res = await client.index.$get();
      expect(res.status).toBe(200);
      expect(await res.text()).toBe(MESSAGES.HELLO);
    });
  });

  describe("GET /companies", () => {
    test("should return companies", async () => {
      const res = await client.companies.$get();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe("POST /seed", () => {
    test("should seed companies", async () => {
      const res = await client.seed.$post();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe(MESSAGES.SEED_SUCCESS);
    });
  });
});
