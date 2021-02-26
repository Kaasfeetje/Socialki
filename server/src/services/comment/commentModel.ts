import mongoose from "mongoose";
import { VISIBILITY } from "../../common/constants/Visibility";

interface CommentAttrs {
    user: string;
    post: string;
    image?: string;
    description?: string;
    replyTo?: string;
    tags?: string[];
    mentions?: string[];
}

export interface CommentDoc extends mongoose.Document {
    user: string;
    post: string;
    image?: string;
    description?: string;
    replyTo?: string;
    tags?: string[];
    mentions?: string[];
    liked?: boolean;
    reblogged?: boolean;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
    build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
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

commentSchema.statics.build = (attrs: CommentAttrs) => {
    return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
    "Comment",
    commentSchema
);

export { Comment };
