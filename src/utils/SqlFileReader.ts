import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class SqlFileReader {
  private static instance: SqlFileReader;

  private constructor() {}

  public static getInstance(): SqlFileReader {
    if (!SqlFileReader.instance) {
      SqlFileReader.instance = new SqlFileReader();
    }
    return SqlFileReader.instance;
  }

  public readSqlFile(filename: string): string {
    return readFileSync(join(__dirname, "..", "sql", `${filename}.sql`), "utf-8");
  }
}
