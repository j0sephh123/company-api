import DatabaseSingleton from "../db.js";
import { companies } from "../data/companies.js";

export class CompanySeeder {
  private db: DatabaseSingleton;

  constructor() {
    this.db = DatabaseSingleton.getInstance();
  }

  public seed(): void {
    const stmt = this.db
      .getDb()
      .prepare("INSERT INTO companies (name) VALUES (?)");
    const insert = this.db.getDb().transaction((companies) => {
      this.db.getDb().prepare("DELETE FROM companies").run();
      for (const company of companies) {
        stmt.run(company.name);
      }
    });

    insert(companies);
  }
}
