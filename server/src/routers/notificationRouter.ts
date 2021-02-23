import express from "express";
import { getNotifications } from "../controllers/notificationController";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

//@desc   Get notifications of logged in user.
//@route  GET /api/v1/notifications
//@access Private
router.get("/", currentUser, requireAuth, getNotifications);

export { router as notificationRouter };
