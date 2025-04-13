import { CompanySeeder } from "../seeders/CompanySeeder.js";

describe("CompanySeeder", () => {
  test("should seed companies", () => {
    const seeder = new CompanySeeder();
    seeder.seed();
    const companies = seeder["db"]
      .getDb()
      .prepare("SELECT * FROM companies")
      .all();
    expect(companies).toHaveLength(3);
  });
});
