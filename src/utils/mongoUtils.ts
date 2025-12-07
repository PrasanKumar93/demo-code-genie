import { MongoClient, ObjectId } from "mongodb";
import PROJ_ENV from "../config";
import { LoggerCls } from "./logger";

const client = new MongoClient(PROJ_ENV.MONGO_URI);
const dbName = PROJ_ENV.MONGO_DB_NAME;

export const insertDocument = async (collectionName: string, document: object) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    LoggerCls.info("Document inserted", result);
    return result;
  } catch (error) {
    LoggerCls.error("Error inserting document", error);
    throw error;
  }
};

export const findById = async (collectionName: string, id: string) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const document = await collection.findOne({ _id: new ObjectId(id) });
    LoggerCls.info("Document found by ID", document);
    return document;
  } catch (error) {
    LoggerCls.error("Error finding document by ID", error);
    throw error;
  }
};

export const findByFilters = async (collectionName: string, filters: object) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find(filters).toArray();
    LoggerCls.info("Documents found by filters", documents);
    return documents;
  } catch (error) {
    LoggerCls.error("Error finding documents by filters", error);
    throw error;
  }
};

export const updateById = async (collectionName: string, id: string, update: object) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
    LoggerCls.info("Document updated by ID", result);
    return result;
  } catch (error) {
    LoggerCls.error("Error updating document by ID", error);
    throw error;
  }
};
