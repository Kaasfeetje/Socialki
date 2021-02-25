import { Like, LikeDoc } from "../services/like/likeModel";
import { PostDoc } from "../services/post/postModel";

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
