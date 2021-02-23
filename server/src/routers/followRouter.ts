import express from "express";
import {
    acceptFollow,
    // createFollow,
    // deleteFollow,
    followHandler,
    rejectFollow,
} from "../controllers/followController";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

//@desc   Follows or unfollows if already following
//@route  POST /api/v1/follow
//@access Private
router.post("/", currentUser, requireAuth, followHandler);

//@desc   Accepts a follow request
//@route  POST /api/v1/follow/:followId/accept
//@access Private
router.post("/:followId/accept", currentUser, requireAuth, acceptFollow);
//@desc   Rejects a follow request
//@route  post /api/v1/follow/:followId/reject
//@access Private
router.post("/:followId/reject", currentUser, requireAuth, rejectFollow);

export { router as followRouter };
