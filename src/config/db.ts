import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is not defined!");
}

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const db = client.db(process.env.DB_NAME);

export const connectDB = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        console.log("✅ Connected to MongoDB Atlas successfully!");
    } catch (error) {
        console.error(error);
    }
};