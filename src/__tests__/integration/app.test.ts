import { testClient } from "hono/testing";
import { app } from "../../index.js";

describe("App", () => {
  const client: any = testClient(app);

  test("should return hello message", async () => {
    const res = await client[""].$get();
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello Hono!");
  });

  test("should return companies", async () => {
    const res = await client.companies.$get();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test("should seed companies", async () => {
    const res = await client.seed.$post();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("Companies seeded successfully");
  });
});
