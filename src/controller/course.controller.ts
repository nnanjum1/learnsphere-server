import { Request, Response } from "express";
import { db } from "../config/db";
import { Course } from "../types/course";

const courseCollection = db.collection<Course>("courses");

export const createCourse = async (
    req: Request,
    res: Response
) => {
    try {
        const course: Course = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await courseCollection.insertOne(course);

        res.status(201).json({
            success: true,
            message: "Course created successfully.",
            insertedId: result.insertedId,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create course.",
        });
    }
};


// Get all courses of an instructor
export const getInstructorCourses = async (
    req: Request,
    res: Response
) => {
    try {
        const { email } = req.params;

        const courses = await courseCollection
            .find({
                instructorEmail: email,
            })
            .sort({
                createdAt: -1,
            })
            .toArray();

        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch courses.",
        });
    }
};