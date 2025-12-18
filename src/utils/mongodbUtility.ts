import { MongoClient, Db } from "mongodb";
import PROJ_ENV from "../config";

let db: Db | null = null;

async function connectToDatabase(): Promise<Db> {
  if (db) return db;

  try {
    const client = new MongoClient(PROJ_ENV.MONGO_URI);
    await client.connect();
    db = client.db(PROJ_ENV.MONGO_DB_NAME);
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export async function insertDocument(collectionName: string, document: object): Promise<void> {
  const db = await connectToDatabase();
  try {
    await db.collection(collectionName).insertOne(document);
    console.log("Document inserted");
  } catch (error) {
    console.error("Failed to insert document", error);
    throw error;
  }
}

export async function findOneDocument(collectionName: string, query: object): Promise<object | null> {
  const db = await connectToDatabase();
  try {
    const document = await db.collection(collectionName).findOne(query);
    return document;
  } catch (error) {
    console.error("Failed to find document", error);
    throw error;
  }
}

export async function findManyDocuments(collectionName: string, query: object): Promise<object[]> {
  const db = await connectToDatabase();
  try {
    const documents = await db.collection(collectionName).find(query).toArray();
    return documents;
  } catch (error) {
    console.error("Failed to find documents", error);
    throw error;
  }
}
