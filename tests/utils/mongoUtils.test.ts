import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { insertDocument, findById, findByFilters } from "../../src/utils/mongoUtils";
import { MongoClient } from "mongodb";
import PROJ_ENV from "../../src/config";

const client = new MongoClient(PROJ_ENV.MONGO_URI);
const dbName = PROJ_ENV.MONGO_DB_NAME;
const collectionName = "testCollection";

beforeAll(async () => {
  await client.connect();
  const db = client.db(dbName);
  await db.createCollection(collectionName);
});

afterAll(async () => {
  const db = client.db(dbName);
  await db.collection(collectionName).drop();
  await client.close();
});

describe("MongoDB Utility Functions", () => {
  it("should insert a document", async () => {
    const document = { name: "Test", value: 42 };
    const result = await insertDocument(collectionName, document);
    expect(result.insertedId).toBeDefined();
  });

  it("should find a document by ID", async () => {
    const document = { name: "FindById", value: 100 };
    const insertResult = await insertDocument(collectionName, document);
    const foundDocument = await findById(collectionName, insertResult.insertedId.toString());
    expect(foundDocument).toMatchObject(document);
  });

  it("should find documents by filters", async () => {
    const document1 = { name: "FilterTest1", value: 1 };
    const document2 = { name: "FilterTest2", value: 2 };
    await insertDocument(collectionName, document1);
    await insertDocument(collectionName, document2);
    const foundDocuments = await findByFilters(collectionName, { value: { $gt: 0 } });
    expect(foundDocuments.length).toBeGreaterThanOrEqual(2);
  });

  it("should update a document by ID", async () => {
    const document = { name: "UpdateTest", value: 50 };
    const insertResult = await insertDocument(collectionName, document);
    const update = { value: 100 };
    const updateResult = await updateById(collectionName, insertResult.insertedId.toString(), update);
    expect(updateResult.modifiedCount).toBe(1);
    const updatedDocument = await findById(collectionName, insertResult.insertedId.toString());
    expect(updatedDocument.value).toBe(100);
  });
});
