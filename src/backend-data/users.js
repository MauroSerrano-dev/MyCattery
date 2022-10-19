const { getMongoCollection } = require("./mongodb");
const { ObjectId } = require("mongodb");

const DATABASE = "hack405";
const USER_COLLECTION = "users";

async function getUserByUsername(username) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.findOne({ username });
  return result;
}
async function getUserByEmail(email) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.findOne({ email });
  return result;
}
async function getUserById(userId) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.findOne({ _id: userId });
  return result;
}

async function addUser(user) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.insertOne(user);
  return result.insertedId;
}
async function deleteUser(id) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

export { getUserByUsername, getUserByEmail, addUser, getUserById, deleteUser };
