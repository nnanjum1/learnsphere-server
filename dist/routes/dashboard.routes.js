"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controller/dashboard.controller");
const enrollment_controller_1 = require("../controller/enrollment.controller");
const router = (0, express_1.Router)();
router.get("/instructor/:email", dashboard_controller_1.getInstructorDashboard);
router.get("/student/:email", enrollment_controller_1.getStudentDashboard);
exports.default = router;
