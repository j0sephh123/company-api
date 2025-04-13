import betterSqlite3 from "better-sqlite3";
import CompanyRepository from "./CompanyRepository.js";
import { SqlFileReader } from "../../../infrastructure/readers/SqlFileReader.js";

export function createCompanyRepository() {
  const db = betterSqlite3("company.db");
  const sqlReader = new SqlFileReader();
  return new CompanyRepository(db, sqlReader);
}
