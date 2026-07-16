import express from "express";
import cors from "cors";

import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cookieParser from "cookie-parser";

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

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://learnsphere-client.vercel.app",
        ],
        credentials: true,
    })
);

app.set("trust proxy", 1);

app.use(express.json());

app.use(cookieParser());


// Database connection FIRST
app.use(
    async (req, res, next) => {
        try {
            await connectDatabase();
            next();
        } catch (error) {
            console.error("MongoDB connection failed:", error);

            res.status(500).json({
                success: false,
                message: "Database connection failed"
            });
        }
    }
);


// Better Auth AFTER database
app.use(
    "/api/auth",
    toNodeHandler(auth)
);


// Application routes
app.use("/courses", courseRoutes);

app.use("/enrollments", enrollmentRoutes);

app.use("/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
    res.send("LearnSphere Server Running - UPDATED");
});


export default app;