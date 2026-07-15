"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const db_1 = require("./config/db");
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const enrollment_routes_1 = __importDefault(require("./routes/enrollment.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_route_1.default);
console.log("Registering course routes...");
app.use("/courses", course_routes_1.default);
app.use("/enrollments", enrollment_routes_1.default);
app.use("/dashboard", dashboard_routes_1.default);
app.get("/", (req, res) => {
    res.send("LearnSphere Server Running");
});
const startServer = async () => {
    await (0, db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();
