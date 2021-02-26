import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import { createComment, getCommentsOnPost } from "./commentController";

const router = express.Router();

//@desc   Create a comment on a post
//@route  POST /api/v1/comments/:postId
//@access Private
router.post("/:postId", currentUser, requireAuth, createComment);

//@desc   Get comments on a post
//@route  GET /api/v1/comments/:postId
//@access Private
router.get("/:postId", currentUser, requireAuth, getCommentsOnPost);

export { router as commentRouter };
