import { Router } from "express";
import {
    createCourse,
    deleteCourse,
    getInstructorCourses,
} from "../controller/course.controller"; const router = Router();

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


export default router;