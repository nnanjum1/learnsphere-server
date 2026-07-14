export interface Enrollment {
    _id?: string;

    courseId: string;

    courseTitle: string;

    thumbnail: string;

    price: number;

    studentId: string;

    studentName: string;

    studentEmail: string;

    instructorId: string;

    instructorName: string;

    enrolledAt: Date;

    progress: number;
}