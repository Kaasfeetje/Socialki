import express from "express";
import morgan from "morgan";
import "express-async-errors";

import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./routers/authRouter";

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

export { app };
