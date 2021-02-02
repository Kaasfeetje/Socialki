import { NextFunction, Response, Request } from "express";
import { ROLES } from "../common/constants/Roles";
import { NotAuthorizedError } from "../common/errors/NotAuthorizedError";

export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser || req.currentUser.role !== ROLES.admin)
        throw new NotAuthorizedError(
            "You must be an admin to access this route, please log in."
        );

    next();
};
