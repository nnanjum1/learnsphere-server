import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("❌ MONGODB_URI is missing");
}

const dbName = process.env.DB_NAME;

if (!dbName) {
    throw new Error("❌ DB_NAME is missing");
}

const mongoOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

let mongoClient: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        mongoClient = new MongoClient(uri, mongoOptions);

        (global as any)._mongoClientPromise = mongoClient.connect();
    }

    clientPromise = (global as any)._mongoClientPromise;

} else {
    mongoClient = new MongoClient(uri, mongoOptions);
    clientPromise = mongoClient.connect();
}


export const client = await clientPromise;

export const db = client.db(dbName);


export const connectDB = async () => {
    try {
        await clientPromise;
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
};