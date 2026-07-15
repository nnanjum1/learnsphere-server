import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

import { client, db } from "./db.js";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
        "http://localhost:3000",
        "https://learnsphere-client.vercel.app",
    ],

    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 60 * 24 * 7,
        },

        cookieAttributes: {
            sameSite: "none",
            secure: true,
        },
    },

    plugins: [jwt()],
});