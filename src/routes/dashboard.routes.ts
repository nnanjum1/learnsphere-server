import { Router } from "express";
import { getInstructorDashboard } from "../controller/dashboard.controller.js";
import { getStudentDashboard } from "../controller/enrollment.controller.js";

const router = Router();

router.get(
    "/instructor/:email",
    getInstructorDashboard
);

router.get(
    "/student/:email",
    getStudentDashboard
);

export default router;