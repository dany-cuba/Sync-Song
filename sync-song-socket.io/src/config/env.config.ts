import { config } from "dotenv";
import { resolve } from "path";
import { cwd } from "process";

const env = process.env.NODE_ENV || "development";

// Load environment variables from a .env file into process.env
const envFilePath = resolve(cwd(), `.env.${env}`);

config({ path: envFilePath });

export const {
  HOST = "localhost",
  PORT = "3001",
  NODE_ENV,
  REDIS_HOST = "localhost",
  REDIS_PORT = "6379",
  REDIS_USERNAME,
  REDIS_PASSWORD,
} = process.env;
