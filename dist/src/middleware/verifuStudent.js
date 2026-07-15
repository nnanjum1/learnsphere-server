"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyStudent = void 0;
const verifyStudent = (req, res, next) => {
    if (req.user?.role !== "student") {
        return res.status(403).send({
            success: false,
            message: "Forbidden",
        });
    }
    next();
};
exports.verifyStudent = verifyStudent;
