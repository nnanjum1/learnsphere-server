import { Request, Response } from "express";
import { db } from "../config/db";
import { Course } from "../types/course";
import { ObjectId } from "mongodb";

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




interface DeleteParams {
    id: string;
}

export const deleteCourse = async (
    req: Request<DeleteParams>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const result = await courseCollection.deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
            res.status(404).json({
                success: false,
                message: "Course not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete course.",
        });
    }
};