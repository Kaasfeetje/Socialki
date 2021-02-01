import express from "express";
import {
    createPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
} from "../controllers/postController";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

//@desc   Gets all posts
//@route  GET /api/v1/posts
//@access Private
router.get("/", currentUser, requireAuth, getPosts);
//@desc   Creates a post
//@route  POST /api/v1/posts
//@access Private
router.post("/", currentUser, requireAuth, createPost);
//@desc   Gets a posts
//@route  GET /api/v1/posts/:postId
//@access Private
router.get("/:postId", currentUser, requireAuth, getPost);
//@desc   Updates a post
//@route  PUT /api/v1/posts/:postId
//@access Private/Owner/Admin
router.put("/:postId", currentUser, requireAuth, updatePost);
//@desc   Deletes a post
//@route  DELETE /api/v1/posts/:postId
//@access Private/Owner/Admin
router.delete("/:postId", currentUser, requireAuth, deletePost);

export { router as postRouter };
