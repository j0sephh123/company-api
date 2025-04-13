import type { Database } from "better-sqlite3";
import { SqlFileReader } from "./SqlFileReader.js";

export class SqlQueryBuilder {
  private static instance: SqlQueryBuilder;
  private sqlReader: SqlFileReader;

  private constructor() {
    this.sqlReader = SqlFileReader.getInstance();
  }

  public static getInstance(): SqlQueryBuilder {
    if (!SqlQueryBuilder.instance) {
      SqlQueryBuilder.instance = new SqlQueryBuilder();
    }
    return SqlQueryBuilder.instance;
  }

  public initializeDatabase(db: Database): void {
    const sql = this.sqlReader.readSqlFile("company");
    db.exec(sql);
  }

  public getAllCompanies(db: Database) {
    const sql = this.sqlReader.readSqlFile("getAllCompanies");
    return db.prepare(sql).all();
  }

  public deleteAllCompanies(db: Database) {
    const sql = this.sqlReader.readSqlFile("deleteAllCompanies");
    return db.prepare(sql).run();
  }

  public insertCompany(db: Database, name: string) {
    const sql = this.sqlReader.readSqlFile("insertCompany");
    return db.prepare(sql).run(name);
  }
}
