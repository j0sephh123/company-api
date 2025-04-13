import { CompanySeeder } from "../../seeders/CompanySeeder.js";
import { Mocker } from "../../mockers/Mocker.js";

describe("CompanySeeder", () => {
  test("should seed companies", () => {
    const seeder = new CompanySeeder();
    const mocker = new Mocker();
    seeder.seed();
    const companies = seeder["db"]
      .getDb()
      .prepare("SELECT * FROM companies")
      .all();
    expect(companies).toHaveLength(mocker.getCompanies().length);
  });
});
