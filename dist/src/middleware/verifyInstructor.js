"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyInstructor = void 0;
const verifyInstructor = (req, res, next) => {
    if (req.user?.role !== "instructor") {
        return res.status(403).send({
            success: false,
            message: "Forbidden",
        });
    }
    next();
};
exports.verifyInstructor = verifyInstructor;
