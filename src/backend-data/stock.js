const { getMongoCollection } = require("./mongodb");
const { ObjectId } = require("mongodb");

const DATABASE = "hack405";
const STOCK_COLLECTION = "stock";

async function addToStock(item) {
  const collection = await getMongoCollection(DATABASE, STOCK_COLLECTION);
  const result = await collection.insertOne(item);
  return result;
}

async function deleteItem(id) {
  const collection = await getMongoCollection(DATABASE, STOCK_COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

async function getAllItems() {
  const collection = await getMongoCollection(DATABASE, STOCK_COLLECTION);
  const result = await collection.find().toArray();
  return result;
}

export {
    addToStock,
    deleteItem,
    getAllItems
}