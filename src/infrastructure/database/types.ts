export interface Database {
  exec(sql: string): void;
  prepare(sql: string): Statement;
  transaction<T>(fn: () => T): () => T;
}

export interface Statement {
  all(): any[];
  run(...params: any[]): any;
}
