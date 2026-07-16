// import { Request, Response, NextFunction } from "express";

// export const verifyStudent = (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {

//     if (req.user?.role !== "student") {
//         return res.status(403).send({
//             success: false,
//             message: "Forbidden",
//         });
//     }

//     next();
// };