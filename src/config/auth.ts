import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./db.js";

export const auth = betterAuth({

    database: mongodbAdapter(client.db("learnsphere")),

    baseURL: process.env.BETTER_AUTH_URL,

    secret: process.env.BETTER_AUTH_SECRET,


    emailAndPassword: {
        enabled: true,
    },


    trustedOrigins: [
        "https://learnsphere-client.vercel.app",
        "http://localhost:3000",
    ],

    advanced: {
        cookies: {
            session_token: {
                attributes: {
                    sameSite: "none",
                    secure: true,
                },
            },
        },
    },

});