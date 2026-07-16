import { MongoClient } from "mongodb";


const uri = process.env.MONGODB_URI;


if (!uri) {
    throw new Error(
        "MONGODB_URI is missing"
    );
}


export const client = new MongoClient(uri);


export const db =
    client.db(
        process.env.DB_NAME
    );


let isConnected = false;


export const connectDB = async () => {

    if (isConnected) {
        return;
    }


    await client.connect();


    isConnected = true;


    console.log("✅ MongoDB Connected");

};