import { config as dotenvConfig } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { afterAll } from "vitest";
import PROJ_ENV from "./src/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenvConfig({ path: path.resolve(__dirname, ".env.test") });

const TEST_ENV_VARS = {
  MONGO_URI: PROJ_ENV.MONGO_URI,
  MONGO_DB_NAME: PROJ_ENV.MONGO_DB_NAME,
  OPENAI_API_KEY: PROJ_ENV.OPENAI_API_KEY,
};

const setupGlobalVars = () => {
  (globalThis as any).TEST_ENV_VARS = TEST_ENV_VARS;
};

//----------- Before all tests ------------
setupGlobalVars();

//----------- After all tests ------------
afterAll(async () => {});
