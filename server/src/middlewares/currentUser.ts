import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserTokenPayload } from "../models/userModel";

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
        const payload = await jwt.verify(
            req.cookies.jwt,
            process.env.JWT_SECRET!
        );

        req.currentUser = payload as UserTokenPayload;
    } catch (err) {}
    next();
};
