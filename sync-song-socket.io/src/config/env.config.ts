import { config } from "dotenv";
import { resolve } from "path";
import { cwd } from "process";

const env = process.env.NODE_ENV || "development";

// Determine the environment file name based on the current environment
const envFileName = env === "production" ? ".env" : `.env.${env}`;

// Load environment variables from a .env file into process.env
const envFilePath = resolve(cwd(), envFileName);

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
