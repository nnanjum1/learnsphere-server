import { Router } from "express";

import {
    enrollCourse, getStudentEnrollments, checkEnrollment,
} from "../controller/enrollment.controller.js";

const router = Router();

router.post("/", enrollCourse);

router.get(
    "/student/:email",
    getStudentEnrollments
);

router.get(
    "/check/:courseId/:email",
    checkEnrollment
);

export default router;