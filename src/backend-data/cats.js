const { getMongoCollection } = require("./mongodb");

const DATABASE = "hack405";
const USER_COLLECTION = "cats";

async function addCat(cat) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.insertOne(cat);
  return result.insertedId;
}

export {
    addCat
}