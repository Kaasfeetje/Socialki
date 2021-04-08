import mongoose from "mongoose";
import { CommentDoc } from "../services/comment/commentModel";
import { Follow, FollowDoc } from "../services/follow/followingModel";
import { LikeComment, LikeCommentDoc } from "../services/like/likeCommentModel";
import { Like, LikeDoc } from "../services/like/likeModel";
import { Reblog, ReblogDoc } from "../services/reblog/reblogModel";
import { UserDoc } from "../services/user/userModel";

export const addLikes = async (posts: any[], userId: string) => {
    const postIds = posts.map((post: any) => post._id);

    //get the liked posts
    const liked = await Like.find({
        post: { $in: postIds },
        user: userId,
    });

    //add a liked field to the posts
    return posts.map((post: any) => {
        const updatedPost = {
            description: post.description,
            image: post.image,
            tags: post.tags,
            mentions: post.mentions,
            visibility: post.visibility,
            id: post.id,
            user: post.user,
            reblogged: post.reblogged,
            liked: false,
        };

        const isLiked = liked.find((like: LikeDoc) => {
            return String(like.post) === String(post._id);
        });
        if (isLiked) {
            updatedPost.liked = true;
        }
        return updatedPost;
    });
};

export const addReblogs = async (posts: any[], userId: string) => {
    const postIds = posts.map((post: any) => post.id);

    const reblogged = await Reblog.find({
        post: { $in: postIds },
        user: userId,
    });

    return posts.map((post: any) => {
        const updatedPost = {
            description: post.description,
            image: post.image,
            tags: post.tags,
            mentions: post.mentions,
            visibility: post.visibility,
            id: post.id,
            user: post.user,
            liked: post.liked,
            reblogged: false,
        };

        const isReblogged = reblogged.find((reblog: ReblogDoc) => {
            return String(reblog.post) === String(post.id);
        });
        if (isReblogged) {
            updatedPost.reblogged = true;
        }
        return updatedPost;
    });
};

export const addLikesToComment = async (comments: any[], userId: string) => {
    const commentIds = comments.map((comment: any) => comment._id);

    const liked = await LikeComment.find({
        comment: { $in: commentIds },
        user: userId,
    });

    return comments.map((post: CommentDoc) => {
        const updatedComment = {
            description: post.description,
            image: post.image,
            tags: post.tags,
            mentions: post.mentions,
            id: post.id,
            user: post.user,
            liked: false,
        };

        const isLiked = liked.find((like: LikeCommentDoc) => {
            return String(like.comment) === String(post._id);
        });
        if (isLiked) {
            updatedComment.liked = true;
        }
        return updatedComment;
    });
};

export const addFollowingToAccounts = async (
    users: UserDoc[],
    userId: string
) => {
    const userIds = users.map((user: UserDoc) => user._id);

    const followed = await Follow.find({
        followed: { $in: userIds },
        follower: userId,
    });

    const updatedUsers = users.map((user: UserDoc) => {
        const updatedUser: any = {
            profileImage: user.profileImage,
            role: user.role,
            isPublic: user.isPublic,
            id: user._id,
            email: user.email,
            username: user.username,
            description: user.description,
            following: false,
        };

        const isFollowed = followed.find((follow: FollowDoc) => {
            console.log(String(follow.followed) === String(user._id));
            return String(follow.followed) === String(user._id);
        });

        updatedUser.following = isFollowed
            ? isFollowed.accepted
                ? true
                : "pending"
            : false;
        return updatedUser;
    });
    console.log(updatedUsers);

    return updatedUsers;
};
