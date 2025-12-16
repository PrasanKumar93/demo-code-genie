import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import LoggerCls from "../utils/logger";

dotenv.config();

let db: Db;

const connectToDatabase = async () => {
  if (!db) {
    try {
      const client = new MongoClient(process.env.MONGO_URI as string);
      await client.connect();
      db = client.db(process.env.MONGO_DB_NAME);
      LoggerCls.info("Connected to MongoDB");
    } catch (error) {
      LoggerCls.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }
  return db;
};

export const insertDocument = async (collectionName: string, document: object) => {
  if (!document) {
    throw new Error("Document to insert cannot be null or undefined");
  }

  try {
    const db = await connectToDatabase();
    const result = await db.collection(collectionName).insertOne(document);
    LoggerCls.info("Document inserted", result);
    return result;
  } catch (error) {
    LoggerCls.error("Failed to insert document", error);
    throw error;
  }
};

export const findOneDocument = async (collectionName: string, query: object) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection(collectionName).findOne(query);
    LoggerCls.info("Document found", result);
    return result;
  } catch (error) {
    LoggerCls.error("Failed to read document", error);
    throw error;
  }
};
export const findManyDocuments = async (collectionName: string, query: object) => {
  try {
    const db = await connectToDatabase();
    const documents = await db.collection(collectionName).find(query).toArray();
    LoggerCls.info("Documents found", documents);
    return documents;
  } catch (error) {
    LoggerCls.error("Failed to find documents", error);
    throw error;
  }
};
