"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseCategories = exports.getFeaturedCourses = exports.getAllCourses = exports.updateCourse = exports.getCourseById = exports.deleteCourse = exports.getInstructorCourses = exports.createCourse = void 0;
const db_1 = require("../config/db");
const mongodb_1 = require("mongodb");
const courseCollection = db_1.db.collection("courses");
const createCourse = async (req, res) => {
    try {
        const course = {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create course.",
        });
    }
};
exports.createCourse = createCourse;
const getInstructorCourses = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses.",
        });
    }
};
exports.getInstructorCourses = getInstructorCourses;
const deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await courseCollection.deleteOne({
            _id: new mongodb_1.ObjectId(id),
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete course.",
        });
    }
};
exports.deleteCourse = deleteCourse;
const getCourseById = async (req, res) => {
    try {
        const course = await courseCollection.findOne({
            _id: new mongodb_1.ObjectId(req.params.id),
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch course.",
        });
    }
};
exports.getCourseById = getCourseById;
const updateCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCourse = {
            ...req.body,
            updatedAt: new Date(),
        };
        const result = await courseCollection.updateOne({
            _id: new mongodb_1.ObjectId(id),
        }, {
            $set: updatedCourse,
        });
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course.",
        });
    }
};
exports.updateCourse = updateCourse;
const getAllCourses = async (req, res) => {
    try {
        const { search = "", category = "", level = "", sort = "newest", page = "1", limit = "6", } = req.query;
        const query = {};
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
        let sortOption = {
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
        const skip = (currentPage - 1) * pageSize;
        const total = await courseCollection.countDocuments(query);
        const courses = await courseCollection
            .find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(pageSize)
            .toArray();
        res.status(200).json({
            success: true,
            courses,
            totalPages: Math.ceil(total / pageSize),
            currentPage,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses.",
        });
    }
};
exports.getAllCourses = getAllCourses;
const getFeaturedCourses = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch featured courses.",
        });
    }
};
exports.getFeaturedCourses = getFeaturedCourses;
const getCourseCategories = async (req, res) => {
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
        const categories = result.map((item) => item.category);
        res.status(200).json({
            success: true,
            categories,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories.",
        });
    }
};
exports.getCourseCategories = getCourseCategories;
