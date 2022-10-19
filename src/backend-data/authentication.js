import { getMongoCollection } from "./mongodb";

const DB_NAME = "mongo-mycattery";
const COLLECTION_NAME = "users";

async function insertUser(user) {
  const collection = await getMongoCollection(DB_NAME, COLLECTION_NAME);
  await collection.insertOne(user);
}

export { insertUser };
