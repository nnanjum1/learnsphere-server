import { Router } from "express";
import {
    createCourse,
    deleteCourse,
    getCourseById,
    getInstructorCourses,
    updateCourse, getAllCourses,
    getFeaturedCourses,
    getCourseCategories
} from "../controller/course.controller.js";


const router = Router();



router.post("/", createCourse);


router.get(
    "/instructor/:email",
    getInstructorCourses
);

router.delete("/:id", deleteCourse);

router.get("/featured", getFeaturedCourses);

router.get("/", getAllCourses);
router.get(
    "/categories",
    getCourseCategories
);
router.get("/:id", getCourseById);

router.patch("/:id", updateCourse);




export default router;