import { Request, Response } from "express";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Like } from "./likeModel";
import { Post } from "../post/postModel";
import { UserTokenPayload } from "../user/userModel";
import { LikeComment } from "./likeCommentModel";
import { Comment } from "../comment/commentModel";

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

export const likeComment = async (req: Request, res: Response) => {
    const { commentId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) throw new NotFoundError("No comment found");

    const alreadyLiked = await LikeComment.findOne({
        user: req.currentUser!.id,
        comment: commentId,
    });

    if (alreadyLiked) {
        //Unlike
        await LikeComment.findByIdAndDelete(alreadyLiked._id);
        return res.status(204).send({});
    }

    //Like
    const like = LikeComment.build({ comment, user: req.currentUser!.id });

    await like.save();

    res.status(201).send({ data: like });
};
