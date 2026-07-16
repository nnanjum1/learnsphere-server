import { Request, Response } from "express";
import { db } from "../config/db.js";
import { Course } from "../types/course.js";


import { Enrollment } from "../types/enrollment.js";



const enrollmentCollection =
    db.collection<Enrollment>("enrollments");

const courseCollection = db.collection<Course>("courses");

export const getInstructorDashboard = async (
    req: Request,
    res: Response
) => {

    try {

        const email = req.params.email;


        const courses = await courseCollection
            .find({
                instructorEmail: email
            })
            .toArray();



        const updatedCourses = await Promise.all(
            courses.map(async (course) => {

                const enrollments =
                    await enrollmentCollection
                        .find({
                            courseId: course._id.toString()
                        })
                        .toArray();


                const revenue = enrollments.reduce(
                    (total, item) =>
                        total + item.price,
                    0
                );


                return {
                    ...course,

                    enrollmentCount:
                        enrollments.length,

                    revenue
                };

            })
        );



        const totalCourses =
            updatedCourses.length;


        const totalStudents =
            updatedCourses.reduce(
                (sum, course) =>
                    sum + course.enrollmentCount,
                0
            );


        const totalRevenue =
            updatedCourses.reduce(
                (sum, course) =>
                    sum + course.revenue,
                0
            );



        res.send({

            success: true,

            summary: {
                totalCourses,
                totalStudents,
                totalRevenue
            },

            courses: updatedCourses

        });



    } catch (error) {

        res.status(500).send({

            success: false,

            message: "Failed to load instructor dashboard"

        });

    }

};