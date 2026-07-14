import { db } from "./db";
import { Course } from "../types/course";

export const courseCollection =
    db.collection<Course>("courses");

export const userCollection =
    db.collection("user");