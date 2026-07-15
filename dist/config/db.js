"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.db = exports.client = void 0;
const node_dns_1 = __importDefault(require("node:dns"));
node_dns_1.default.setServers(["8.8.8.8", "8.8.4.4"]);
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MONGODB_URI is not defined!");
}
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
        await exports.client.db("admin").command({ ping: 1 });
        console.log("✅ Connected to MongoDB Atlas successfully!");
    }
    catch (error) {
        console.error(error);
    }
};
exports.connectDB = connectDB;
