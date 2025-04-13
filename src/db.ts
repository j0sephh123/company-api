import betterSqlite3 from "better-sqlite3";
import type { Database } from "better-sqlite3";

class DatabaseSingleton {
  private static instance: DatabaseSingleton;
  private db: Database;

  private constructor() {
    this.db = betterSqlite3("company.db");
    this.initializeDatabase();
  }

  public static getInstance(): DatabaseSingleton {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new DatabaseSingleton();
    }
    return DatabaseSingleton.instance;
  }

  private initializeDatabase(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);
  }

  public getDb(): Database {
    return this.db;
  }
}

export default DatabaseSingleton;
