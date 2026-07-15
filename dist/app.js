"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_js_1 = __importDefault(require("./routes/auth.route.js"));
const course_routes_js_1 = __importDefault(require("./routes/course.routes.js"));
const enrollment_routes_js_1 = __importDefault(require("./routes/enrollment.routes.js"));
const dashboard_routes_js_1 = __importDefault(require("./routes/dashboard.routes.js"));
const db_js_1 = require("./config/db.js");
const auth_1 = require("./config/auth");
const node_1 = require("better-auth/node");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://learnsphere-client.vercel.app",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Database connection for Serverless environments (Vercel)
(0, db_js_1.connectDB)().catch(err => console.error("MongoDB connection error:", err));
app.use("/api/auth", (0, node_1.toNodeHandler)(auth_1.auth));
// Routes
app.use("/auth", auth_route_js_1.default);
app.use("/courses", course_routes_js_1.default);
app.use("/enrollments", enrollment_routes_js_1.default);
app.use("/dashboard", dashboard_routes_js_1.default);
app.get("/", (req, res) => {
    res.send("🚀 LearnSphere Server Running");
});
// CRITICAL: Export app for Vercel
exports.default = app;
