import { Request, Response } from "express";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { parseMentions, parseTags } from "../../common/parse";
import { addLikesToComment } from "../../common/postUtils";
import { Post } from "../post/postModel";
import { UserTokenPayload } from "../user/userModel";
import { Comment } from "./commentModel";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserTokenPayload;
        }
    }
}

export const createComment = async (req: Request, res: Response) => {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) throw new NotFoundError("No post found");

    const { description, image } = req.body;
    let tags, mentions;

    if (description) {
        mentions = await parseMentions(description);
        tags = await parseTags(description);
    }

    const comment = Comment.build({
        post: postId,
        user: req.currentUser!.id,
        description,
        image,
        mentions,
        tags,
    });

    await comment.save();

    res.status(201).send({ data: comment });
};

export const getCommentsOnPost = async (req: Request, res: Response) => {
    const postId = req.params.postId;
    //TODO: check if user is following current post or if the current post is public

    const comments = await Comment.find({ post: postId }).populate("user");

    if (comments.length === 0)
        throw new NotFoundError("Did not find any comments");

    const updatedComments = await addLikesToComment(
        comments,
        req.currentUser!.id
    );

    res.status(200).send({ data: updatedComments });
};
