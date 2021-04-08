import express from "express";
import morgan from "morgan";
import "express-async-errors";
import cookieParser from "cookie-parser";
import path from "path";

import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./services/auth/authRouter";
import { postRouter } from "./services/post/postRouter";
import { followRouter } from "./services/follow/followRouter";
import { userRouter } from "./services/user/userRouter";
import { uploadRouter } from "./services/upload/uploadRouter";
import { likeRouter } from "./services/like/likeRouter";
import { notificationRouter } from "./services/notification/notificationRouter";
import { reblogRouter } from "./services/reblog/reblogRouter";
import { commentRouter } from "./services/comment/commentRouter";
import { searchRouter } from "./services/search/searchRouter";

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
app.use("/api/v1/reblog", reblogRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/search", searchRouter);

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
