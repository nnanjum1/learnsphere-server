import { Request, Response, NextFunction } from "express";
import { auth } from "../config/auth.js";


export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const headers = new Headers();


        Object.entries(req.headers).forEach(
            ([key, value]) => {

                if (typeof value === "string") {
                    headers.append(key, value);
                }

                else if (Array.isArray(value)) {
                    headers.append(
                        key,
                        value.join(",")
                    );
                }

            }
        );


        const session =
            await auth.api.getSession({
                headers,
            });


        if (!session) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }


        req.user = session.user;


        next();


    } catch (error) {

        console.error(
            "Auth middleware error:",
            error
        );


        res.status(500).json({
            success: false,
            message: "Authentication failed"
        });

    }

};