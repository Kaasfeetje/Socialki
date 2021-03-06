import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserTokenPayload } from "../services/user/userModel";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserTokenPayload;
        }
    }
}

export const currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.cookies.jwt) return next();

    try {
        const payload = jwt.verify(
            req.cookies.jwt,
            process.env.JWT_SECRET!
        ) as UserTokenPayload;
        req.currentUser = payload;
    } catch (err) {}

    next();
};
