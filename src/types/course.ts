import { ObjectId } from "mongodb";
export type CourseLevel =
    | "Beginner"
    | "Intermediate"
    | "Advanced";

export interface Course {
    _id?: ObjectId;
    title: string;
    thumbnail: string;

    category: string;
    level: CourseLevel;

    duration: string;
    price: number;

    shortDescription: string;
    description: string;

    requirements: string[];
    learningOutcomes: string[];

    instructorId: string;
    instructorName: string;
    instructorEmail: string;
    enrollmentCount: 0,
    createdAt: Date;
    updatedAt: Date;
}
