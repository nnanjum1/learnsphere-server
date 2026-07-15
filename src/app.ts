import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import { connectDB } from "./config/db.js";
import { auth } from "./config/auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();

let isConnected = false;

// MongoDB connection for Vercel serverless
const connectDatabase = async () => {
    if (isConnected) return;

    try {
        await connectDB();
        isConnected = true;
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
};

// Middleware
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


// Ensure database connection before every request
app.use(async (req, res, next) => {
    try {
        await connectDatabase();
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});


// Better Auth
app.use("/api/auth", toNodeHandler(auth));


// Application routes
app.use("/auth", authRoute);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/dashboard", dashboardRoutes);


// Default route
app.get("/", (req, res) => {
    res.status(200).send("🚀 LearnSphere Server Running");
});


// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "LearnSphere API is healthy",
    });
});


export default app;