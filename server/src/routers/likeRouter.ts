import express from "express";
import { likePost, unlikePost } from "../controllers/likeController";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

//@desc   Like a post
//@route  POST /api/v1/like
//@access Private
router.post("/", currentUser, requireAuth, likePost);
//@desc   Unlike a post
//@route  DELETE /api/v1/like
//@access Private
router.delete("/", currentUser, requireAuth, unlikePost);

export { router as likeRouter };
