import dotenv from "dotenv";

dotenv.config();

const PROJ_ENV = {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

export default PROJ_ENV;
