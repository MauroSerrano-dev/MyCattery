const { getMongoCollection } = require("./mongodb");
const { ObjectId } = require("mongodb");

const DATABASE = "hack405";
const CATS_COLLECTION = "cats";

async function addCat(cat) {
  const collection = await getMongoCollection(DATABASE, CATS_COLLECTION);
  const result = await collection.insertOne(cat);
  return result.insertedId;
}
async function deleteCat(id) {
  const collection = await getMongoCollection(DATABASE, CATS_COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}
export {
    addCat,
    deleteCat
}