"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = exports.courseCollection = void 0;
const db_1 = require("./db");
exports.courseCollection = db_1.db.collection("courses");
exports.userCollection = db_1.db.collection("user");
