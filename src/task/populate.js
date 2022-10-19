
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
    {
        name: "Cleo",
        photo: "Cleo.jpg",
        gender: "female",
        age: "2 months",
        castrado: false,
        cor: "tartaruga",
        personalidade: "hiperativa"
    },
    {
        name: "Cleopatra",
        photo: "Cleopatra.jpg",
        gender: "female",
        age: "1 year old",
        castrado: true,
        cor: "tartaruga",
        personalidade: "sociavel"
    },
    {
        name: "Floquinho",
        photo: "Floquinho.jpg",
        gender: "male",
        age: "2 months",
        castrado: false,
        cor: "branco",
        personalidade: "sociavel"
    },
    {
        name: "Frankie",
        photo: "Frankie.jpg",
        gender: "male",
        age: "1 year old",
        castrado: true,
        cor: "laranja",
        personalidade: "arisco"
    },
    {
        name: "Isa",
        photo: "Isa.jpg",
        gender: "female",
        age: "5 years old",
        castrado: true,
        cor: "Branco e cinza",
        personalidade: "medrosa"
    },
    {
        name: "Pamela",
        photo: "Pamela.jpg",
        gender: "female",
        age: "4 months",
        castrado: false,
        cor: "Tigrada",
        personalidade: "sociavel"
    },
    {
        name: "Sebastião",
        photo: "Sebastião.jpg",
        gender: "male",
        age: "2 months",
        castrado: false,
        cor: "Branco e preto",
        personalidade: "hiperativo"
    },
    {
        name: "Tsuki",
        photo: "Tsuki.jpg",
        gender: "male",
        age: "2 months",
        castrado: false,
        cor: "Neve",
        personalidade: "sociavel"
    },
    {
        name: "Winnie",
        photo: "Winnie.jpg",
        gender: "female",
        age: "1 ano",
        castrado: true,
        cor: "Laranja",
        personalidade: "arisca"
    },
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


