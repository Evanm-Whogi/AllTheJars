import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from 'dotenv';
dotenv.config();

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required at runtime");
  }
  if (!dbInstance) {
    dbInstance = drizzle(url);
  }
  return dbInstance;
}
