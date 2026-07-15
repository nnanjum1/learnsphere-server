import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";
import { connectDB } from "./config/db";
import courseRoutes from "./routes/course.routes";
import enrollmentRoutes from "./routes/enrollment.routes";
import dashboardRoutes from "./routes/dashboard.routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoute);

console.log("Registering course routes...");



app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.send("LearnSphere Server Running");
});



const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();