import DatabaseSingleton from "../db.js";
import { Mocker } from "../mockers/Mocker.js";
import { SqlQueryBuilder } from "../utils/SqlQueryBuilder.js";

export class CompanySeeder {
  private db: DatabaseSingleton;
  private mocker: Mocker;
  private queryBuilder: SqlQueryBuilder;

  constructor() {
    this.db = DatabaseSingleton.getInstance();
    this.mocker = new Mocker();
    this.queryBuilder = SqlQueryBuilder.getInstance();
  }

  public seed(): void {
    const insert = this.db.getDb().transaction((companies) => {
      this.queryBuilder.deleteAllCompanies(this.db.getDb());
      for (const company of companies) {
        this.queryBuilder.insertCompany(this.db.getDb(), company.name);
      }
    });

    insert(this.mocker.getCompanies());
  }
}
