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