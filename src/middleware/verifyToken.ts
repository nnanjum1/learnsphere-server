// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { JwtPayload } from "jsonwebtoken";


// export const verifyToken = (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {

//     const token = req.cookies?.token;

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorized",
//         });
//     }


//     jwt.verify(
//         token,
//         process.env.JWT_SECRET as string,
//         (
//             err: jwt.VerifyErrors | null,
//             decoded: string | JwtPayload | undefined
//         ) => {
//             if (err) {
//                 return res.status(401).json({
//                     success: false,
//                     message: "Invalid Token",
//                 });
//             }

//             req.user = decoded;

//             next();
//         }
//     );
// };