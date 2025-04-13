import { Hono } from "hono";
import { MESSAGES } from "../constants/messages.js";
import { createCompanyRepository } from "../domain/company/repositories/companyFactory.js";

const companyRepo = createCompanyRepository();

const companiesApp = new Hono();

companiesApp
  .get("/", (c) => {
    const companies = companyRepo.getAllCompanies();
    return c.json(companies);
  })
  .patch("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const { name } = await c.req.json();
    const result = companyRepo.updateCompanyName(id, name);
    if (result.changes === 0) {
      return c.json({ error: MESSAGES.COMPANY_NOT_FOUND }, 404);
    }
    return c.json({ message: MESSAGES.COMPANY_UPDATE_SUCCESS });
  });

export default companiesApp;
