import betterSqlite3 from "better-sqlite3";
import type { Database } from "better-sqlite3";
import { SqlFileReader } from "./utils/SqlFileReader.js";

class DatabaseSingleton {
  private static instance: DatabaseSingleton;
  private db: Database;
  private sqlReader: SqlFileReader;

  private constructor() {
    this.db = betterSqlite3("company.db");
    this.sqlReader = SqlFileReader.getInstance();
    this.initializeDatabase();
  }

  public static getInstance(): DatabaseSingleton {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new DatabaseSingleton();
    }
    return DatabaseSingleton.instance;
  }

  private initializeDatabase(): void {
    const sql = this.sqlReader.readSqlFile("company.sql");
    this.db.exec(sql);
  }

  public getDb(): Database {
    return this.db;
  }
}

export default DatabaseSingleton;
