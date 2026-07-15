"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollment_controller_1 = require("../controller/enrollment.controller");
const router = (0, express_1.Router)();
router.post("/", enrollment_controller_1.enrollCourse);
router.get("/student/:email", enrollment_controller_1.getStudentEnrollments);
exports.default = router;
