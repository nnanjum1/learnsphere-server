import { Router } from "express";
import {
    createCourse,
    deleteCourse,
    getCourseById,
    getInstructorCourses,
    updateCourse, getAllCourses
} from "../controller/course.controller";

const router = Router();



router.post("/", createCourse);



router.post("/", createCourse);

router.get(
    "/instructor/:email",
    getInstructorCourses
);

router.delete("/:id", deleteCourse);

router.get("/:id", getCourseById);

router.patch("/:id", updateCourse);

router.get("/", getAllCourses);




export default router;