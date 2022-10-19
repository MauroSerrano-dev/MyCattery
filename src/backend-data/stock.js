const { getMongoCollection } = require("./mongodb");

const DATABASE = "hack405";
const USER_COLLECTION = "stock";

async function addToStock(item) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.insertOne(item);
  return result;
}

export {
    addToStock
}