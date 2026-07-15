import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to DB locally before spinning up the port listener
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running locally on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start local development server:", error);
        process.exit(1);
    }
};

startServer();