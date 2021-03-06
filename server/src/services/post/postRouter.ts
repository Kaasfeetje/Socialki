import express from "express";
import {
    createPost,
    deletePost,
    getPost,
    getPosts,
    getUsersPosts,
    getYourFeed,
    updatePost,
} from "./postController";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";

const router = express.Router();

//@desc   Gets all posts
//@query  ?lastPost -gets post after lastPost
//@route  GET /api/v1/posts
//@access Private
router.get("/", currentUser, requireAuth, getPosts);
//@desc   Creates a post
//@route  POST /api/v1/posts
//@access Private
router.post("/", currentUser, requireAuth, createPost);

//@desc   Gets your feed
//@route  GET /api/v1/posts/feed
//@access Private
router.get("/feed", currentUser, requireAuth, getYourFeed);

//@desc   Gets a users posts
//@route  GET /api/v1/posts/users/:user
//@access Private
router.get("/users/:user", currentUser, requireAuth, getUsersPosts);

//@desc   Gets a post
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

//TODO: Following tags
//TODO: Get posts ?top query that gives recent popular posts.

export { router as postRouter };
