import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createJWT = (
    req: Request,
    res: Response
) => {
    const user = req.body;

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d",
        }
    );

    console.log("JWT Token:", token);

    res
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .send({
            success: true,
        });
};

export const logout = (
    req: Request,
    res: Response
) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
            process.env.NODE_ENV === "production"
                ? "none"
                : "lax",
    });

    res.send({
        success: true,
    });
};