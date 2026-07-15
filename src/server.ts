import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = () => {
    try {
        app.listen(PORT, () => {
            console.log(`🚀 Server running locally on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start local development server:", error);
        process.exit(1);
    }
};

startServer();