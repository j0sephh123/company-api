import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class SqlFileReader {
  private static instance: SqlFileReader;
  private basePath: string;

  public constructor() {
    this.basePath = join(__dirname, "..", "sql", "company");
  }

  public static getInstance(): SqlFileReader {
    if (!SqlFileReader.instance) {
      SqlFileReader.instance = new SqlFileReader();
    }
    return SqlFileReader.instance;
  }

  public readSqlFile(filename: string): string {
    return readFileSync(join(this.basePath, `${filename}.sql`), "utf-8");
  }
}
