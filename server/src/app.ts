import express from "express";
import morgan from "morgan";
import "express-async-errors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./routers/authRouter";
import { postRouter } from "./routers/postRouter";
import { followRouter } from "./routers/followRouter";
import { userRouter } from "./routers/userRouter";

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/follow", followRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export { app };
