import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import { search } from "./searchController";

const router = express.Router();

//@desc   Search posts and users
//@route  GET /api/v1/search
//@access Private
router.post("/", currentUser, requireAuth, search);

export { router as searchRouter };
