import { MongoClient, ObjectId } from "mongodb";
import PROJ_ENV from "../config";

class MongoDBUtility {
  private client: MongoClient;
  private dbName: string;

  constructor() {
    this.client = new MongoClient(PROJ_ENV.MONGO_URI as string);
    this.dbName = PROJ_ENV.MONGO_DB_NAME as string;
  }

  async connect() {
    if (!this.client.topology || !this.client.topology.isConnected()) {
      await this.client.connect();
    }
  }

  async insert(collectionName: string, document: object) {
    await this.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(collectionName);
    return await collection.insertOne(document);
  }

  async findById(collectionName: string, id: string) {
    await this.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(collectionName);
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async findByOne(collectionName: string, filter: object) {
    await this.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(collectionName);
    return await collection.findOne(filter);
  }

  async findMany(collectionName: string, filter: object) {
    await this.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(collectionName);
    return await collection.find(filter).toArray();
  }

  async close() {
    await this.client.close();
  }
}

export default MongoDBUtility;
