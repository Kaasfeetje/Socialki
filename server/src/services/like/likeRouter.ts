import express from "express";
import { likeComment, likePost } from "./likeController";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";

const router = express.Router();

//@desc   Like or dislike a post if it is already liked
//@route  POST /api/v1/like
//@access Private
router.post("/", currentUser, requireAuth, likePost);
//@desc   Like or dislike a comment if it is already liked
//@route  POST /api/v1/like/comment
//@access Private
router.post("/comment", currentUser, requireAuth, likeComment);

export { router as likeRouter };
