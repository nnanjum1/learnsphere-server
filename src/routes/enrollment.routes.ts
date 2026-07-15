import { Router } from "express";

import {
    enrollCourse, getStudentEnrollments,
} from "../controller/enrollment.controller.js";

const router = Router();

router.post("/", enrollCourse);

router.get(
    "/student/:email",
    getStudentEnrollments
);

export default router;