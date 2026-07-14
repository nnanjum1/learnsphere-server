export type CourseLevel =
    | "Beginner"
    | "Intermediate"
    | "Advanced";

export interface Course {
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

    createdAt: Date;
    updatedAt: Date;
}