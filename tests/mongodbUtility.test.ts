import { describe, it, expect, beforeAll, afterAll } from "vitest";
import MongoDBUtility from "../src/utils/mongodbUtility";

let mongoUtil: MongoDBUtility;

beforeAll(async () => {
  mongoUtil = new MongoDBUtility();
  await mongoUtil.connect();
});

beforeEach(async () => {
  const db = mongoUtil.client.db(mongoUtil.dbName);
  await db.collection(testCollection).deleteMany({});
});

afterAll(async () => {
  await mongoUtil.close();
});

describe("MongoDBUtility", () => {
  const testCollection = "testCollection";
  const testDocument = { name: "Test", value: 42 };

  it("should insert a document", async () => {
    const result = await mongoUtil.insert(testCollection, testDocument);
    expect(result.insertedId).toBeDefined();
  });

  it("should find a document by ID", async () => {
    const insertResult = await mongoUtil.insert(testCollection, testDocument);
    const foundDocument = await mongoUtil.findById(testCollection, insertResult.insertedId.toString());
    expect(foundDocument).toMatchObject(testDocument);
  });

  it("should find a document by filter", async () => {
    await mongoUtil.insert(testCollection, testDocument);
    const foundDocument = await mongoUtil.findByOne(testCollection, { name: "Test" });
    expect(foundDocument).toMatchObject(testDocument);
  });

  it("should find multiple documents by filter", async () => {
    await mongoUtil.insert(testCollection, testDocument);
    const documents = await mongoUtil.findMany(testCollection, { name: "Test" });
    expect(documents.length).toBeGreaterThan(0);
  });
});
