import { Router } from "express";
import {
    createCourse,
    deleteCourse,
    getCourseById,
    getInstructorCourses,
    updateCourse,
} from "../controller/course.controller";

const router = Router();

router.get("/", (req, res) => {
    res.send("Course Route Working");
});

router.post("/", createCourse);



router.post("/", createCourse);

router.get(
    "/instructor/:email",
    getInstructorCourses
);

router.delete("/:id", deleteCourse);

router.get("/:id", getCourseById);

router.patch("/:id", updateCourse);




export default router;