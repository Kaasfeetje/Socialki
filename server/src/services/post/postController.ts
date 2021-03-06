import { Request, Response } from "express";
import mongoose from "mongoose";

import { NotAuthorizedError } from "../../common/errors/NotAuthorizedError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { parseMentions, parseTags } from "../../common/parse";
import { ROLES } from "../../common/constants/Roles";
import { Post } from "./postModel";
import { User, UserTokenPayload } from "../user/userModel";
import { VISIBILITY } from "../../common/constants/Visibility";
import { Follow, FollowDoc } from "../follow/followingModel";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { addLikes, addReblogs } from "../../common/postUtils";
import { Reblog } from "../reblog/reblogModel";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserTokenPayload;
        }
    }
}

export const getPosts = async (req: Request, res: Response) => {
    const amountOfPosts = 10;

    const lastPost = new Date(
        req.query.lastPost ? String(req.query.lastPost) : Date.now()
    ).toISOString();

    const query = {
        createdAt: { $lt: lastPost },
        visibility: { $eq: VISIBILITY.public },
    };

    const posts = await Post.find(query)
        .populate([
            "user",
            { path: "tags", model: "Tag" },
            { path: "mentions", model: "User" },
        ])
        .sort({
            createdAt: -1,
        })
        .limit(amountOfPosts);

    if (posts.length === 0) throw new NotFoundError("No content found");

    const updatedPosts = await addReblogs(
        await addLikes(posts, req.currentUser!.id),
        req.currentUser!.id
    );

    res.status(200).send({
        data: updatedPosts,
        lastPost: posts[posts.length - 1].createdAt,
    });
};

export const createPost = async (req: Request, res: Response) => {
    const { description, image, visibility } = req.body;

    if (!description && !image)
        throw new BadRequestError("Provide either an image, text or both");

    let tags, mentions;

    if (description) {
        mentions = await parseMentions(description);
        tags = await parseTags(description);
    }

    const post = Post.build({
        user: req.currentUser!.id,
        description,
        image,
        visibility,
        mentions,
        tags,
    });

    await post.save();

    res.status(201).send({ data: post });
};

export const getYourFeed = async (req: Request, res: Response) => {
    const amountOfPosts = 10;

    const lastPost = new Date(
        req.query.lastPost ? String(req.query.lastPost) : Date.now()
    ).toISOString();

    const followedAccounts = await Follow.find({
        follower: req.currentUser!.id,
        accepted: true,
    });

    const followed = followedAccounts.map((follow: FollowDoc) =>
        String(follow.followed)
    );
    followed.push(req.currentUser!.id);

    const query = {
        createdAt: { $lt: lastPost },
        user: { $in: followed },
        visibility: { $in: [VISIBILITY.public, VISIBILITY.private] },
    };

    const posts = await Post.find(query)
        .populate([
            "user",
            { path: "tags", model: "Tag" },
            { path: "mentions", model: "User" },
        ])
        .sort({
            createdAt: -1,
        })
        .limit(amountOfPosts);
    if (posts.length === 0) throw new NotFoundError("No content found");
    const reblogs = await Reblog.find({
        createdAt: { $lt: lastPost },
        user: { $in: followed },
    })
        .populate([
            {
                path: "user",
                model: "User",
            },
            {
                path: "post",
                model: "Post",
            },
            {
                path: "post",
                populate: {
                    path: "user",
                    model: "User",
                },
            },
        ])
        .sort({
            createdAt: -1,
        })
        .limit(amountOfPosts);

    const finalPosts: any[] = [];
    const reblogThing: any[] = [];
    let lastReblog = 0;
    let lastPostIndex = 0;
    for (let i = 0; i < amountOfPosts; i++) {
        const a = reblogs[lastReblog];
        const b = posts[lastPostIndex];
        if (a && !b) {
            finalPosts.push(a.post);
            reblogThing.push(a.user);
            lastReblog++;
        } else if (b && !a) {
            finalPosts.push(b);
            reblogThing.push(false);
            lastPostIndex++;
        } else if (!a && !b) {
            break;
        } else {
            if (a.createdAt > b.createdAt) {
                finalPosts.push(a.post);
                reblogThing.push(a.user);
                lastReblog++;
            } else {
                finalPosts.push(b);
                reblogThing.push(false);
                lastPostIndex++;
            }
        }
    }

    //add likes and reblogs;
    const updatedPosts = await addReblogs(
        await addLikes(finalPosts, req.currentUser!.id),
        req.currentUser!.id
    );

    updatedPosts.forEach((post) => {
        if (
            post.visibility !== VISIBILITY.public &&
            !followed.includes(post.user.id)
        ) {
            post.image = "";
            post.description = "You are not following this account";
        }
    });

    res.status(200).send({
        data: updatedPosts,
        reblogs: reblogThing,
        lastPost: finalPosts[updatedPosts.length - 1].createdAt,
    });
};

export const getPost = async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.postId).populate([
        "user",
        { path: "tags", model: "Tag" },
        { path: "mentions", model: "User" },
    ]);

    if (!post) throw new NotFoundError("Post not found");

    const updatedPosts = await addLikes([post], req.currentUser!.id);

    if (updatedPosts[0].visibility === VISIBILITY.private) {
        const isFollowing = await Follow.findOne({
            follower: req.currentUser!.id,
            followed: updatedPosts[0].user._id,
            accepted: true,
        });

        if (!isFollowing) {
            updatedPosts[0].image = "";
            updatedPosts[0].description = "You are not following this account";
        }
    }

    res.status(200).send({ data: updatedPosts[0] });
};

export const updatePost = async (req: Request, res: Response) => {
    const { description, image, visibility } = req.body;

    const post = await Post.findById(req.params.postId);

    if (!post)
        throw new NotFoundError("Did not find the post you were looking for.");

    if (
        req.currentUser!.role !== ROLES.admin &&
        post.user != req.currentUser!.id
    )
        throw new NotAuthorizedError("You do not own this post.");

    let tags, mentions;
    if (description) {
        mentions = await parseMentions(description);
        tags = await parseTags(description);
    }

    post.description = description || post.description;
    post.image = image || post.image;
    post.visibility = visibility || post.visibility;
    post.tags = tags || post.tags;
    post.mentions = mentions || post.mentions;

    await post.save();

    res.status(200).send({ data: post });
};

export const deletePost = async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.postId);

    if (!post)
        throw new NotFoundError("Did not find the post you were looking for.");

    if (
        req.currentUser!.role == ROLES.admin &&
        post.user != req.currentUser!.id
    )
        throw new NotAuthorizedError("You do not own this post.");

    Post.findByIdAndDelete(post._id);

    res.status(204).send({});
};

export const getUsersPosts = async (req: Request, res: Response) => {
    const amountOfPosts = 10;

    const lastPost = new Date(
        req.query.lastPost ? String(req.query.lastPost) : Date.now()
    ).toISOString();

    //check if user is valid
    const isValidId = mongoose.isValidObjectId(req.params.user);
    const user = isValidId
        ? await User.findById(req.params.user)
        : await User.findOne({
              username: { $eq: req.params.user },
          });

    if (!user) throw new NotFoundError("Did not find user");

    //check if following
    const isFollowing =
        (await Follow.findOne({
            follower: req.currentUser!.id,
            followed: user._id,
            accepted: true,
        })) || req.currentUser?.id == user._id;

    const query = {
        createdAt: { $lt: lastPost },
        user: user._id,
        visibility: {
            $in: isFollowing
                ? [VISIBILITY.public, VISIBILITY.private]
                : [VISIBILITY.public],
        },
    };
    //TODO: FIX THIS QUERY;
    const posts = await Post.find(query)
        .populate([
            "user",
            { path: "tags", model: "Tag" },
            { path: "mentions", model: "User" },
        ])
        .sort({
            createdAt: -1,
        })
        .limit(amountOfPosts);

    if (posts.length === 0) throw new NotFoundError("No content found");

    //add likes
    const updatedPosts = await addLikes(posts, req.currentUser!.id);

    res.status(200).send({
        data: updatedPosts,
        lastPost: posts[posts.length - 1].createdAt,
    });
};
