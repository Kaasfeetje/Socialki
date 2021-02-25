import express from "express";
import { reblogPost } from "../controllers/reblogController";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

//@desc   Reblog or de-reblog a post.
//@route  POST /api/v1/reblog
//@access Private
router.post("/", currentUser, requireAuth, reblogPost);

export { router as reblogRouter };
