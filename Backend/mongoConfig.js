const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const connectToMongoDB = async () => {
    try {
        const uri = process.env.MONGO_DB_URL;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB!");
        return client.db();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

const getCollection = async (collectionName) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection(collectionName);
        return collection;
    } catch (error) {
        console.error("Error accessing MongoDB collection:", error);
        throw error;
    }
};

module.exports = { connectToMongoDB, getCollection };
