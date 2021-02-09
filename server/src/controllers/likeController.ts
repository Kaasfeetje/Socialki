import { Request, Response } from "express";
import { BadRequestError } from "../common/errors/BadRequestError";
import { NotFoundError } from "../common/errors/NotFoundError";
import { Like } from "../models/likeModel";
import { Post } from "../models/postModel";
import { UserTokenPayload } from "../models/userModel";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserTokenPayload;
        }
    }
}

export const likePost = async (req: Request, res: Response) => {
    const { postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) throw new NotFoundError("No post found");

    const alreadyLiked = await Like.findOne({
        user: req.currentUser!.id,
        post: postId,
    });

    if (alreadyLiked) {
        //Unlike
        await Like.findByIdAndDelete(alreadyLiked._id);
        return res.status(204).send({});
    }

    //Like
    const like = Like.build({ post, user: req.currentUser!.id });

    await like.save();

    res.status(201).send({ data: like });
};
