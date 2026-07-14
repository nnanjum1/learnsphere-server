import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { db } from "../config/db";

import { Enrollment } from "../types/enrollment";
import { Course } from "../types/course";

const enrollmentCollection =
    db.collection<Enrollment>("enrollments");

const courseCollection =
    db.collection<Course>("courses");


export const enrollCourse = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            courseId,
            studentId,
            studentName,
            studentEmail,
        } = req.body;

        const alreadyEnrolled =
            await enrollmentCollection.findOne({
                courseId,
                studentEmail,
            });

        if (alreadyEnrolled) {
            return res.status(400).json({
                success: false,
                message: "Already enrolled.",
            });
        }

        const course =
            await courseCollection.findOne({
                _id: new ObjectId(courseId),
            });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        const enrollment: Enrollment = {
            courseId,

            courseTitle: course.title,

            thumbnail: course.thumbnail,

            price: course.price,

            studentId,

            studentName,

            studentEmail,

            instructorId:
                course.instructorId,

            instructorName:
                course.instructorName,

            enrolledAt: new Date(),

            progress: 0,
        };

        await enrollmentCollection.insertOne(
            enrollment
        );

        await courseCollection.updateOne(
            {
                _id: new ObjectId(courseId),
            },
            {
                $inc: {
                    enrollmentCount: 1,
                },
            }
        );

        res.status(201).json({
            success: true,
            message: "Enrollment successful.",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Enrollment failed.",
        });

    }
};

export const getStudentEnrollments = async (
    req: Request,
    res: Response
) => {
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
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch enrolled courses.",
        });
    }
};

export const getStudentDashboard = async (
    req: Request,
    res: Response
) => {
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

        const totalSpent = enrollments.reduce(
            (sum, item) => sum + item.price,
            0
        );

        const completedCourses = enrollments.filter(
            (item) => item.progress === 100
        ).length;

        res.status(200).json({
            success: true,

            summary: {
                totalCourses,
                completedCourses,
                totalSpent,
            },

            recentCourses: enrollments.slice(0, 5),
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard.",
        });
    }
};