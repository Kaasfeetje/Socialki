import express from "express";
import { likePost } from "../controllers/likeController";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

//@desc   Like or dislike a post if it is already liked
//@route  POST /api/v1/like
//@access Private
router.post("/", currentUser, requireAuth, likePost);
export { router as likeRouter };
