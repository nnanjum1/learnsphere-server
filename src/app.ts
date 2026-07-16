import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import { connectDB } from "./config/db.js";
import { auth } from "./config/auth.js";
import { toNodeHandler } from "better-auth/node";





const app = express();


let isConnected = false;


const connectDatabase = async () => {

    if (isConnected) return;


    await connectDB();

    isConnected = true;


    console.log("✅ MongoDB Connected");

};



// CORS

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://learnsphere-client.vercel.app",
        ],
        credentials: true,
    })
);



app.use(express.json());

app.use(cookieParser());



// Database connection

app.use(
    async (req, res, next) => {

        try {

            await connectDatabase();

            next();

        }
        catch (error) {

            console.error(
                "MongoDB connection failed:",
                error
            );


            res.status(500).json({
                success: false,
                message: "Database connection failed"
            });

        }

    }
);



// Better Auth

app.use(
    "/api/auth",
    toNodeHandler(auth)
);



// Application Routes

app.use(
    "/courses",
    courseRoutes
);


app.use(
    "/enrollments",
    enrollmentRoutes
);


app.use(
    "/dashboard",
    dashboardRoutes
);



app.get(
    "/",
    (req, res) => {
        res.send(
            "🚀 LearnSphere Server Running"
        );
    }
);



export default app;