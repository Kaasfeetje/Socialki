import express from "express";
import {
    signin,
    signout,
    signup,
    updateMe,
} from "../controllers/authController";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

//@desc   logs in a user and returns a token
//@route  POST /api/v1/auth/signin
//@access Public
router.post("/signin", signin);
//@desc   Creates a user and returns a token
//@route  POST /api/v1/auth/signup
//@access Public
router.post("/signup", signup);
//@desc   logs out a user and destroys the token
//@route  POST /api/v1/auth/signout
//@access Private
router.post("/signout", currentUser, requireAuth, signout);

//@desc   Updates the logged in user and returns a token
//@route  PUT /api/v1/auth/update-me
//@access Private
router.put("/update-me", currentUser, requireAuth, updateMe);

export { router as authRouter };
