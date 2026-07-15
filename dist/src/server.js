"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const PORT = process.env.PORT || 5000;
const startServer = () => {
    try {
        app_js_1.default.listen(PORT, () => {
            console.log(`🚀 Server running locally on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start local development server:", error);
        process.exit(1);
    }
};
startServer();
