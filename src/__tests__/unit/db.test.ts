import { Mocker } from "../../data/mockers/Mocker.js";
import { CompanySeeder } from "../../data/seeders/CompanySeeder.js";

describe("CompanySeeder", () => {
  test("should seed companies", async () => {
    const seeder = new CompanySeeder();
    const mocker = new Mocker();
    const mockCompanies = mocker.getCompanies();

    seeder.seed();
    const companies = seeder.getAllCompanies();
    expect(companies).toHaveLength(mockCompanies.length);
  });
});
