import express from "express";
import {
    // createFollow,
    // deleteFollow,
    followHandler,
} from "../controllers/followController";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

//@desc   Creates a new follow - Follow
//@route  POST /api/v1/follow
//@access Private
router.post("/", currentUser, requireAuth, followHandler);
//@desc   Deletes a follow - Unfollow
//@route  DELETE /api/v1/follow
//@access Private
// router.delete("/", currentUser, requireAuth, deleteFollow);

export { router as followRouter };
