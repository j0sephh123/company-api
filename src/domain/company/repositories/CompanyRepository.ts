import type { Database } from "better-sqlite3";
import { SqlReader } from "../../../infrastructure/readers/SqlReader.js";

export default class CompanyRepository {
  constructor(private db: Database, private sqlReader: SqlReader) {
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    const sql = this.sqlReader.readSqlFile("company");
    this.db.exec(sql);
  }

  public getAllCompanies() {
    const sql = this.sqlReader.readSqlFile("getAllCompanies");
    return this.db.prepare(sql).all();
  }

  public deleteAllCompanies() {
    const sql = this.sqlReader.readSqlFile("deleteAllCompanies");
    return this.db.prepare(sql).run();
  }

  public insertCompany(name: string) {
    const sql = this.sqlReader.readSqlFile("insertCompany");
    return this.db.prepare(sql).run(name);
  }

  public transaction<T>(fn: () => T): T {
    return this.db.transaction(fn)();
  }
}
