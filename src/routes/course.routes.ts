import { Router } from "express";
import { createCourse } from "../controller/course.controller";
const router = Router();

router.get("/", (req, res) => {
    res.send("Course Route Working");
});

router.post("/", createCourse);

export default router;