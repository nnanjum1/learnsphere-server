// import { Request, Response, NextFunction } from "express";

// export const verifyInstructor = (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {

//     if (req.user?.role !== "instructor") {
//         return res.status(403).send({
//             success: false,
//             message: "Forbidden",
//         });
//     }

//     next();
// };