import { Router } from "express";
import { getInstructorDashboard } from "../controller/dashboard.controller";

const router = Router();

router.get(
    "/instructor/:email",
    getInstructorDashboard
);

export default router;