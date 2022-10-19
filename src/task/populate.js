
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
    {
        typeItem: "Pills",
        nome: "Milpro",
        quantidade: "134",
        validade: "03/12/22"
    },
    {
        typeItem: "Pills",
        nome: "Acticam",
        quantidade: "56",
        validade: "07/07/23"
    },
    {
        typeItem: "Pills",
        nome: "Cerenia",
        quantidade: "35",
        validade: "10/04/23"
    },
    {
        typeItem: "Pills",
        nome: "Propalin",
        quantidade: "4",
        validade: "29/08/23"
    },
    {
        typeItem: "Pills",
        nome: "Vectra 3D",
        quantidade: "43",
        validade: "25/05/23"
    },
    {
        typeItem: "Pills",
        nome: "Amodip 1.25",
        quantidade: "18",
        validade: "03/08/23"
    },
    {
        typeItem: "Pills",
        nome: "Apoquel 3.6",
        quantidade: "67",
        validade: "28/09/23"
    },
    {
        typeItem: "Pills",
        nome: "Banacep 5mg",
        quantidade: "89",
        validade: "25/04/23"
    },
    {
        typeItem: "Pills",
        nome: "Lisina Aid",
        quantidade: "5",
        validade: "03/01/23"
    },
    {
        typeItem: "Pills",
        nome: "We Confort",
        quantidade: "7",
        validade: "07/10/23"
    },
    {
        typeItem: "Vaccines",
        nome: "Nobivac tricat",
        quantidade: "54",
        validade: "12/03/24"
    },
    {
        typeItem: "Vaccines",
        nome: "Nobivac Rabies",
        quantidade: "45",
        validade: "17/07/24"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Neutered Satiety Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Neutered Satiety Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Neutered Satiety Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Neutered Satiety Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Neutered Satiety Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Neutered Satiety Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Neutered Satiety Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Satiety Weight Management Cat 7kg",
        quantidade: "7000",
        validade: "24/05/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Satiety Weight Management Cat 7kg",
        quantidade: "7000",
        validade: "24/05/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Satiety Weight Management Cat 7kg",
        quantidade: "7000",
        validade: "24/05/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Growth 2kg",
        quantidade: "2000",
        validade: "22/02/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Growth 2kg",
        quantidade: "2000",
        validade: "22/02/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Growth 2kg",
        quantidade: "2000",
        validade: "22/02/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Growth 2kg",
        quantidade: "2000",
        validade: "22/02/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Growth 2kg",
        quantidade: "2000",
        validade: "22/02/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Growth 2kg",
        quantidade: "2000",
        validade: "22/02/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Weaning 4kg",
        quantidade: "4000",
        validade: "27/09/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Weaning 4kg",
        quantidade: "4000",
        validade: "27/09/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Weaning 4kg",
        quantidade: "4000",
        validade: "27/09/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Weaning 4kg",
        quantidade: "4000",
        validade: "27/09/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Weaning 4kg",
        quantidade: "4000",
        validade: "27/09/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Weaning 4kg",
        quantidade: "4000",
        validade: "27/09/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Weaning 4kg",
        quantidade: "4000",
        validade: "27/09/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Diabetic 7kg",
        quantidade: "7000",
        validade: "08/06/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Diabetic 7kg",
        quantidade: "7000",
        validade: "08/06/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Diabetic 7kg",
        quantidade: "7000",
        validade: "08/06/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Royal Canin Cat Renal 2kg",
        quantidade: "2000",
        validade: "27/07/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Cat Sterilized Salmon 10kg",
        quantidade: "10000",
        validade: "19/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Cat Sterilized Salmon 10kg",
        quantidade: "10000",
        validade: "19/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Cat Sterilized Salmon 10kg",
        quantidade: "10000",
        validade: "19/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Cat Sterilized Salmon 10kg",
        quantidade: "10000",
        validade: "19/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Cat Sterilized Chicken 10kg",
        quantidade: "10000",
        validade: "19/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Cat Sterilized Chicken 10kg",
        quantidade: "10000",
        validade: "19/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Cat Sterilized Chicken 10kg",
        quantidade: "10000",
        validade: "19/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Adult Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Adult Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Adult Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Adult Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Adult Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Adult Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Adult Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Proplan Purina Adult Cat 10kg",
        quantidade: "10000",
        validade: "03/08/23"
    },
    {
        typeItem: "Food",
        nome: "Hill's K/D Cat 2kg",
        quantidade: "10000",
        validade: "28/02/23"
    },
    {
        typeItem: "Food",
        nome: "Hill's K/D Cat 2kg",
        quantidade: "10000",
        validade: "28/02/23"
    },
    {
        typeItem: "Food",
        nome: "Hill's K/D Cat 2kg",
        quantidade: "10000",
        validade: "28/02/23"
    },

]

cats.forEach(async cat => {
    await addCat(cat)
})
console.log("Populate Cats")
stock.forEach(async item => {
    await addToStock(item)
})
console.log("Populate Stock")


