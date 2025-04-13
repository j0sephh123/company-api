import { createCompanyRepository } from "../../domain/company/repositories/companyFactory.js";
import CompanyRepository from "../../domain/company/repositories/CompanyRepository.js";
import { Mocker } from "../mockers/Mocker.js";
export class CompanySeeder {
  private mocker: Mocker;
  private companyRepo: CompanyRepository;

  constructor() {
    this.mocker = new Mocker();
    this.companyRepo = createCompanyRepository();
  }

  public getAllCompanies() {
    return this.companyRepo.getAllCompanies();
  }

  public seed(): void {
    this.companyRepo.transaction(() => {
      this.companyRepo.deleteAllCompanies();
      for (const company of this.mocker.getCompanies()) {
        this.companyRepo.insertCompany(company.name);
      }
    });
  }
}
