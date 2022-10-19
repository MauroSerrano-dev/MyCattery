
const DATABASE = "hack405";
const CATS_COLLECTION = "cats";
const STOCK_COLLECTION = "stock";
const { MongoClient } = require("mongodb")
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"

let client
async function connectToMongo() {
    if (!client) {
        client = await new MongoClient(URL).connect()
    }
    return client
}

async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
}

async function addCat(cat) {
    const collection = await getMongoCollection(DATABASE, CATS_COLLECTION);
    const result = await collection.insertOne(cat);
    return result.insertedId;
}


async function addToStock(item) {
    const collection = await getMongoCollection(DATABASE, STOCK_COLLECTION);
    const result = await collection.insertOne(item);
    return result;
  }

const cats = [
    { a: 3 },
    { a: 3 },
    { a: 3 },
]

const stock = [
    { a: 4 },
    { a: 4 },
    { a: 4 },
]

cats.forEach(async cat => {
    await addCat(cat)
})
console.log("Populate Cats")
stock.forEach(async item => {
    await addToStock(item)
})
console.log("Populate Stock")


