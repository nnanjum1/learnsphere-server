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
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyInstructor } from "../middleware/verifyInstructor.js";

const router = Router();



router.post("/", verifyToken,
    verifyInstructor, createCourse);


router.get(
    "/instructor/:email", verifyToken,
    verifyInstructor,
    getInstructorCourses
);

router.delete("/:id", verifyToken,
    verifyInstructor, deleteCourse);

router.get("/featured", getFeaturedCourses);

router.get("/", getAllCourses);
router.get(
    "/categories",
    getCourseCategories
);
router.get("/:id", getCourseById);

router.patch("/:id", verifyToken,
    verifyInstructor, updateCourse);




export default router;