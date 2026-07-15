import { db } from "./db.js";
import { Course } from "../types/course.js";

export const courseCollection =
    db.collection<Course>("courses");

export const userCollection =
    db.collection("user");