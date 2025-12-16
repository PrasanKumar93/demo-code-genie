import { MongoClient, Db, ObjectId } from "mongodb";
import PROJ_ENV from "../config";
import { LoggerCls } from "../utils/logger";

class MongoDBUtility {
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(PROJ_ENV.MONGO_URI as string);
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(PROJ_ENV.MONGO_DB_NAME);
      LoggerCls.info("Connected to MongoDB");
    } catch (error) {
      LoggerCls.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }

  async insertDocument(collectionName: string, document: any) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.insertOne(document);
      LoggerCls.info("Document inserted", result);
      return result;
    } catch (error) {
      if (error.code === 11000) {
        LoggerCls.error("Duplicate ID error", error);
        throw new Error("Duplicate ID error");
      }
      LoggerCls.error("Failed to insert document", error);
      throw error;
    }
  }

  async findById(collectionName: string, id: string) {
    try {
      const collection = this.db.collection(collectionName);
      const document = await collection.findOne({ _id: new ObjectId(id) });
      LoggerCls.info("Document retrieved by ID", document);
      return document;
    } catch (error) {
      LoggerCls.error("Failed to retrieve document by ID", error);
      throw error;
    }
  }

  async findOne(collectionName: string, query: object) {
    try {
      const collection = this.db.collection(collectionName);
      const document = await collection.findOne(query);
      LoggerCls.info("Document retrieved by query", document);
      return document;
    } catch (error) {
      LoggerCls.error("Failed to retrieve document by query", error);
      throw error;
    }
  }

  async close() {
    try {
      await this.client.close();
      LoggerCls.info("MongoDB connection closed");
    } catch (error) {
      LoggerCls.error("Failed to close MongoDB connection", error);
      throw error;
    }
  }
}

export default MongoDBUtility;
