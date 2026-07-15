"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructorDashboard = void 0;
const db_1 = require("../config/db");
const courseCollection = db_1.db.collection("courses");
const getInstructorDashboard = async (req, res) => {
    try {
        const { email } = req.params;
        const courses = await courseCollection
            .find({
            instructorEmail: email,
        })
            .toArray();
        const totalCourses = courses.length;
        const totalStudents = courses.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0);
        const totalRevenue = courses.reduce((sum, course) => sum +
            (course.price || 0) *
                (course.enrollmentCount || 0), 0);
        const courseStats = courses.map((course) => ({
            _id: course._id,
            title: course.title,
            price: course.price,
            enrollmentCount: course.enrollmentCount || 0,
            revenue: (course.price || 0) *
                (course.enrollmentCount || 0),
        }));
        res.status(200).json({
            success: true,
            summary: {
                totalCourses,
                totalStudents,
                totalRevenue,
            },
            courses: courseStats,
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
exports.getInstructorDashboard = getInstructorDashboard;
