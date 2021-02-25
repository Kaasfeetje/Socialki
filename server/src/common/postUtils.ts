import { Like, LikeDoc } from "../services/like/likeModel";
import { PostDoc } from "../services/post/postModel";
import { Reblog, ReblogDoc } from "../services/reblog/reblogModel";

export const addLikes = async (posts: PostDoc[], userId: string) => {
    const postIds = posts.map((post: PostDoc) => post._id);

    //get the liked posts
    const liked = await Like.find({
        post: { $in: postIds },
        user: userId,
    });

    //add a liked field to the posts
    return posts.map((post: PostDoc) => {
        const updatedPost = {
            description: post.description,
            image: post.image,
            tags: post.tags,
            mentions: post.mentions,
            visibility: post.visibility,
            id: post.id,
            user: post.user,
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
