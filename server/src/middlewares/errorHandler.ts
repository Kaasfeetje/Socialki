import { Request, Response, NextFunction } from "express";
import { CustomError } from "../common/errors/CustomError";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError)
        return res
            .status(err.statusCode)
            .send({ errors: err.serializeErrors() });

    if (process.env.NODE_ENV === "development") {
        console.log(err);
    }

    res.status(500).send({ errors: [{ message: "Something went wrong!" }] });
};
