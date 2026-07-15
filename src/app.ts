import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Database connection for Serverless environments (Vercel)
if (process.env.NODE_ENV === "production") {
    connectDB().catch(err => console.error("MongoDB connection error:", err));
}

// Routes
app.use("/auth", authRoute);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.send("🚀 LearnSphere Server Running");
});

// CRITICAL: Export app for Vercel
export default app;