"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentDashboard = exports.getStudentEnrollments = exports.enrollCourse = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
const enrollmentCollection = db_1.db.collection("enrollments");
const courseCollection = db_1.db.collection("courses");
const enrollCourse = async (req, res) => {
    try {
        const { courseId, studentId, studentName, studentEmail, } = req.body;
        const alreadyEnrolled = await enrollmentCollection.findOne({
            courseId,
            studentEmail,
        });
        if (alreadyEnrolled) {
            return res.status(400).json({
                success: false,
                message: "Already enrolled.",
            });
        }
        const course = await courseCollection.findOne({
            _id: new mongodb_1.ObjectId(courseId),
        });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }
        const enrollment = {
            courseId,
            courseTitle: course.title,
            thumbnail: course.thumbnail,
            price: course.price,
            studentId,
            studentName,
            studentEmail,
            instructorId: course.instructorId,
            instructorName: course.instructorName,
            enrolledAt: new Date(),
            progress: 0,
        };
        await enrollmentCollection.insertOne(enrollment);
        await courseCollection.updateOne({
            _id: new mongodb_1.ObjectId(courseId),
        }, {
            $inc: {
                enrollmentCount: 1,
            },
        });
        res.status(201).json({
            success: true,
            message: "Enrollment successful.",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Enrollment failed.",
        });
    }
};
exports.enrollCourse = enrollCourse;
const getStudentEnrollments = async (req, res) => {
    try {
        const { email } = req.params;
        const enrollments = await enrollmentCollection
            .find({
            studentEmail: email,
        })
            .sort({
            enrolledAt: -1,
        })
            .toArray();
        res.status(200).json({
            success: true,
            enrollments,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch enrolled courses.",
        });
    }
};
exports.getStudentEnrollments = getStudentEnrollments;
const getStudentDashboard = async (req, res) => {
    try {
        const { email } = req.params;
        const enrollments = await enrollmentCollection
            .find({
            studentEmail: email,
        })
            .sort({
            enrolledAt: -1,
        })
            .toArray();
        const totalCourses = enrollments.length;
        const totalSpent = enrollments.reduce((sum, item) => sum + item.price, 0);
        const completedCourses = enrollments.filter((item) => item.progress === 100).length;
        res.status(200).json({
            success: true,
            summary: {
                totalCourses,
                completedCourses,
                totalSpent,
            },
            recentCourses: enrollments.slice(0, 5),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to load dashboard.",
        });
    }
};
exports.getStudentDashboard = getStudentDashboard;
