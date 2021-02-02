import { Request, Response } from "express";
import { NotAuthorizedError } from "../common/errors/NotAuthorizedError";
import { NotFoundError } from "../common/errors/NotFoundError";
import { parseMentions, parseTags } from "../common/parse";
import { ROLES } from "../common/constants/Roles";
import { Post } from "../models/postModel";
import { UserTokenPayload } from "../models/userModel";
import { VISIBILITY } from "../common/constants/Visibility";
import { Follow, FollowDoc } from "../models/followingModel";
import { BadRequestError } from "../common/errors/BadRequestError";

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

    const user =
        req.query.user && req.query.user !== ""
            ? String(req.query.user)
            : undefined;

    const query = {
        createdAt: { $lt: lastPost },
        user: { $eq: user },
        visibility: { $eq: VISIBILITY.public },
    };

    const posts = await Post.find(query)
        .sort({
            createdAt: -1,
        })
        .limit(amountOfPosts);

    if (posts.length === 0) throw new NotFoundError("No content found");

    res.status(200).send({
        data: posts,
        lastPost: posts[posts.length - 1].createdAt,
    });
};

export const createPost = async (req: Request, res: Response) => {
    const { description, image, visibility } = req.body;

    if (!description && !image)
        throw new BadRequestError("Provide either an image or text or both");

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
    });

    const followed = followedAccounts.map(
        (follow: FollowDoc) => follow.followed
    );

    const query = {
        createdAt: { $lt: lastPost },
        user: { $in: followed },
        visibility: { $in: [VISIBILITY.public, VISIBILITY.private] },
    };

    const posts = await Post.find(query)
        .sort({
            createdAt: -1,
        })
        .limit(amountOfPosts);

    if (posts.length === 0) throw new NotFoundError("No content found");

    res.status(200).send({
        data: posts,
        lastPost: posts[posts.length - 1].createdAt,
    });
};

export const getPost = async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.postId);

    if (!post)
        throw new NotFoundError("Did not find the post you were looking for.");

    //TODO: Check if either public or (private and current user is following)

    res.status(200).send({ data: post });
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
