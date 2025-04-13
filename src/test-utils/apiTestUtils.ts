// apiTestUtils.ts
import { testClient } from "hono/testing";
import { Company } from "../domain/company/repositories/Company.js";
import app from "../index.js";

export const client = testClient(app);

export const getCompanies = async () => {
  const response = await client.companies.$get();
  return response.json() as Promise<Company[]>;
};
