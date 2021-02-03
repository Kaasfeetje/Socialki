import { Request, Response } from "express";
import { NotFoundError } from "../common/errors/NotFoundError";
import { Like } from "../models/likeModel";
import { Post } from "../models/postModel";

export const likePost = async (req: Request, res: Response) => {
    const { postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) throw new NotFoundError("No post found");

    const like = Like.build({ post, user: req.currentUser!.id });

    await like.save();

    res.status(201).send({ data: like });
};

export const unlikePost = async (req: Request, res: Response) => {
    const { postId } = req.body;

    const like = await Like.findOne({ post: postId });

    if (!like) throw new NotFoundError("You have not liked this post");

    res.status(204).send({});
};
