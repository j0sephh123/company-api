import DatabaseSingleton from "../db.js";
import { Mocker } from "../mockers/Mocker.js";

export class CompanySeeder {
  private db: DatabaseSingleton;
  private mocker: Mocker;

  constructor() {
    this.db = DatabaseSingleton.getInstance();
    this.mocker = new Mocker();
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

    insert(this.mocker.getCompanies());
  }
}
