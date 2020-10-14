const MongoClient = require("mongodb").MongoClient;
const fs = require("fs").promises;
const commaNumber = require("comma-number");

// Constants
const url = "mongodb://localhost:27017";
const dbName = "wineTaste";
const collectionName = 'tastes'
const fileName = "wine.json";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  });

async function main() {
    try {
        const start = Date.now();
        await client.connect();
        console.log("connected to server");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const wineData = await fs.readFile(fileName, "utf-8")
        await collection.insertMany(JSON.parse(wineData))

        const count =await collection.find().count();

        console.log(commaNumber(count));
        console.log(Date.now() -start / 1000);

        process.exit();
    } catch (error) {
        console.log(error);
    }    
}