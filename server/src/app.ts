import express from "express";
import morgan from "morgan";
import "express-async-errors";
import cookieParser from "cookie-parser";
import path from "path";

import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./routers/authRouter";
import { postRouter } from "./routers/postRouter";
import { followRouter } from "./routers/followRouter";
import { userRouter } from "./routers/userRouter";
import { uploadRouter } from "./routers/uploadRouter";
import { likeRouter } from "./routers/likeRouter";

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
app.use("/api/v1/like", likeRouter);

app.use("/api/v1/upload", uploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
    console.log(path.join(__dirname, "..", "client/build"));
    app.use(express.static(path.join(__dirname, "..", "client/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "..", "client/build/index.html"))
    );
}

app.use(errorHandler);

export { app };
