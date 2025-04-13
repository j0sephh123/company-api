import betterSqlite3 from "better-sqlite3";
import type { Database } from "better-sqlite3";
import { SqlQueryBuilder } from "./utils/SqlQueryBuilder.js";

class DatabaseSingleton {
  private static instance: DatabaseSingleton;
  private db: Database;
  private queryBuilder: SqlQueryBuilder;

  private constructor() {
    this.db = betterSqlite3("company.db");
    this.queryBuilder = SqlQueryBuilder.getInstance();
    this.initializeDatabase();
  }

  public static getInstance(): DatabaseSingleton {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new DatabaseSingleton();
    }
    return DatabaseSingleton.instance;
  }

  private initializeDatabase(): void {
    this.queryBuilder.initializeDatabase(this.db);
  }

  public getDb(): Database {
    return this.db;
  }
}

export default DatabaseSingleton;
