"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (req, res) => {
    const user = req.body;
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role,
    }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    console.log("JWT Token:", token);
    res
        .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .send({
        success: true,
    });
};
exports.createJWT = createJWT;
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
    });
    res.send({
        success: true,
    });
};
exports.logout = logout;
