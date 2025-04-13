import { testClient } from "hono/testing";
import app from "../../index.js";
import { MESSAGES } from "../../constants/messages.js";
import { createCompanyRepository } from "../../domain/company/repositories/companyFactory.js";
import { getCompanies } from "../../test-utils/apiTestUtils.js";

describe("App", () => {
  const client = testClient(app);
  const companyRepo = createCompanyRepository();

  describe("methods", () => {
    beforeEach(async () => {
      await client.seed.$post();
    });

    afterEach(() => {
      companyRepo.deleteAllCompanies();
    });

    test("GET /companies should return companies", async () => {
      const res = await client.companies.$get();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });
    test("GET / should return hello message", async () => {
      const res = await client.index.$get();
      expect(res.status).toBe(200);
      expect(await res.text()).toBe(MESSAGES.HELLO);
    });
    test("PATCH /companies/:id should update company name", async () => {
      const initialCompanies = await getCompanies();
      const firstCompany = initialCompanies[0];
      const initialName = firstCompany.name;

      const res = await client.companies[":id"].$patch({
        param: { id: firstCompany.id.toString() },
        json: { name: "NewName" },
      } as any);
      expect(res.status).toBe(200);
      const data = (await res.json()) as { message: string };
      expect(data.message).toBe(MESSAGES.COMPANY_UPDATE_SUCCESS);

      const updatedCompanies = await getCompanies();
      const updatedCompany = updatedCompanies.find(
        (c) => c.id === firstCompany.id
      );
      expect(updatedCompany?.name).toBe("NewName");
      expect(updatedCompany?.name).not.toBe(initialName);
    });
  });

  describe("POST /seed", () => {
    test("should return success message", async () => {
      const res = await client.seed.$post();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe(MESSAGES.SEED_SUCCESS);
    });
  });
});
