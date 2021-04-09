import { Request, Response } from "express";
import { VISIBILITY } from "../../common/constants/Visibility";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { addFollowingToAccounts } from "../../common/postUtils";
import { Post } from "../post/postModel";
import { Tag } from "../tag/tagModel";
import { User, UserTokenPayload } from "../user/userModel";
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserTokenPayload;
        }
    }
}
export const search = async (req: Request, res: Response) => {
    const { keyword, first } = req.body;

    const lastPost = new Date(
        req.query.lastPost ? String(req.query.lastPost) : Date.now()
    ).toISOString();

    if (keyword.startsWith("#")) {
        const tagKeyword = keyword.split(" ")[0].replace("#", "").toLowerCase();
        //Get tags
        const tags = await Tag.find({
            name: { $regex: tagKeyword },
        });

        //Find posts with tags
        const posts = await Post.find({
            tags: { $in: tags },
            visibility: VISIBILITY.public,
            createdAt: { $lt: lastPost },
        })
            .populate([
                "user",
                { path: "tags", model: "Tag" },
                { path: "mentions", model: "User" },
            ])
            .sort({ createdAt: -1 })
            .limit(10);

        if (posts.length === 0) throw new NotFoundError("No content found");

        //return posts
        return res.status(200).send({
            data: { posts, users: [] },
            lastPost:
                posts.length > 0 ? posts[posts.length - 1].createdAt : lastPost,
        });
    } else if (keyword.startsWith("@")) {
        const tagKeyword = keyword.split(" ")[0].replace("@", "").toLowerCase();

        const users = await User.find({
            username: { $regex: tagKeyword },
        }).limit(10);

        return res.status(200).send({ data: { users, posts: [] } });
    }

    let users: any[] = [];

    if (first) {
        const initialUsers = await User.find({
            username: { $regex: keyword.toLowerCase() },
        }).limit(5);
        users = await addFollowingToAccounts(initialUsers, req.currentUser!.id);
    }

    const posts = await Post.find({
        description: { $regex: keyword },
        createdAt: { $lt: lastPost },
    })
        .populate([
            "user",
            { path: "tags", model: "Tag" },
            { path: "mentions", model: "User" },
        ])
        .sort({
            createdAt: -1,
        })
        .limit(users ? 10 - users.length : 10);

    if (posts.length === 0) throw new NotFoundError("No content found");

    res.status(200).send({
        data: { users, posts },
        lastPost:
            posts.length > 0 ? posts[posts.length - 1].createdAt : lastPost,
    });
};
