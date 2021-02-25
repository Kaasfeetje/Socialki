import mongoose from "mongoose";
import { VISIBILITY } from "../../common/constants/Visibility";

interface PostAttrs {
    user: string;
    image?: string;
    description?: string;
    tags?: string[];
    mentions?: string[];
    visibility?: string;
}

export interface PostDoc extends mongoose.Document {
    user: string;
    image?: string;
    description?: string;
    tags?: string[];
    mentions?: string[];
    visibility: string;
    liked?: boolean;
    reblogged?: boolean;
}

interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttrs): PostDoc;
}

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        tags: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Tag",
        },
        mentions: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
        },
        visibility: {
            type: String,
            required: true,
            default: VISIBILITY.public,
            enum: [VISIBILITY.public, VISIBILITY.private, VISIBILITY.unlisted],
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

postSchema.statics.build = (attrs: PostAttrs) => {
    return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
