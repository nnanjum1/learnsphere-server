import { Request, Response } from "express";
import { db } from "../config/db.js";
import { Course } from "../types/course.js";
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



export const deleteCourse = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id as string;

        const result = await courseCollection.deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete course.",
        });
    }
};


interface CourseParams {
    id: string;
}

export const getCourseById = async (
    req: Request<CourseParams>,
    res: Response
) => {
    try {
        const course = await courseCollection.findOne({
            _id: new ObjectId(req.params.id),
        });

        if (!course) {
            res.status(404).json({
                success: false,
                message: "Course not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            course,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch course.",
        });
    }
};


export const updateCourse = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id as string;

        const updatedCourse = {
            ...req.body,
            updatedAt: new Date(),
        };

        const result = await courseCollection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: updatedCourse,
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update course.",
        });
    }
};


export const getAllCourses = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            search = "",
            category = "",
            level = "",
            sort = "newest",
            page = "1",
            limit = "6",
        } = req.query;

        const query: any = {};

        if (search) {
            query.title = {
                $regex: search,
                $options: "i",
            };
        }

        if (category) {
            query.category = category;
        }

        if (level) {
            query.level = level;
        }

        let sortOption: any = {
            createdAt: -1,
        };

        switch (sort) {
            case "price_asc":
                sortOption = { price: 1 };
                break;

            case "price_desc":
                sortOption = { price: -1 };
                break;

            case "title":
                sortOption = { title: 1 };
                break;

            default:
                sortOption = { createdAt: -1 };
        }

        const currentPage = Number(page);
        const pageSize = Number(limit);

        const skip =
            (currentPage - 1) * pageSize;

        const total =
            await courseCollection.countDocuments(
                query
            );

        const courses =
            await courseCollection
                .find(query)
                .sort(sortOption)
                .skip(skip)
                .limit(pageSize)
                .toArray();

        res.status(200).json({
            success: true,
            courses,
            totalPages: Math.ceil(
                total / pageSize
            ),
            currentPage,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch courses.",
        });
    }
};

export const getFeaturedCourses = async (
    req: Request,
    res: Response
) => {
    try {
        const courses = await courseCollection
            .find({})
            .sort({
                enrollmentCount: -1,
            })
            .limit(4)
            .toArray();

        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch featured courses.",
        });
    }
};

export const getCourseCategories = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await courseCollection
            .aggregate([
                {
                    $group: {
                        _id: "$category",
                    },
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id",
                    },
                },
                {
                    $sort: {
                        category: 1,
                    },
                },
            ])
            .toArray();

        const categories = result.map(
            (item) => item.category
        );

        res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories.",
        });
    }
};