import { Request, Response } from "express";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Post } from "../post/postModel";
import { Reblog } from "./reblogModel";
import { UserTokenPayload } from "../user/userModel";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserTokenPayload;
        }
    }
}

export const reblogPost = async (req: Request, res: Response) => {
    const { postId } = req.body;

    console.log(postId);
    const post = await Post.findById(postId);
    if (!post) throw new NotFoundError("No post found");

    const alreadyReblogged = await Reblog.findOne({
        user: req.currentUser!.id,
        post: postId,
    });

    if (alreadyReblogged) {
        await Reblog.findByIdAndDelete(alreadyReblogged._id);
        return res.status(204).send({});
    }

    const reblog = Reblog.build({ post, user: req.currentUser!.id });

    await reblog.save();

    res.status(201).send({ data: reblog });
};
