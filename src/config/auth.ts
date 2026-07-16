import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


const client = new MongoClient(
    process.env.MONGODB_URI!
);


const db = client.db(
    process.env.DB_NAME
);



export const auth = betterAuth({

    database: mongodbAdapter(
        db
    ),


    secret:
        process.env.BETTER_AUTH_SECRET,


    baseURL:
        process.env.BETTER_AUTH_URL,


    trustedOrigins: [
        "http://localhost:3000",
        "https://learnsphere-client.vercel.app",
    ],


});