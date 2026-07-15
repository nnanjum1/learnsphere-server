"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.db = exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_1 = require("mongodb");
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("DB_NAME:", process.env.DB_NAME);
const uri = process.env.MONGODB_URI;
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
exports.db = exports.client.db(process.env.DB_NAME);
const connectDB = async () => {
    try {
        await exports.client.connect();
        console.log("✅ Connected to MongoDB");
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.connectDB = connectDB;
