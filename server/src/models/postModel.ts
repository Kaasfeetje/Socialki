import mongoose from "mongoose";

interface PostAttrs {
    user: string;
    image?: string;
    description?: string;
    tags?: string[];
    mentions?: string[];
    isPublic?: boolean;
}

interface PostDoc extends mongoose.Document {
    user: string;
    image?: string;
    description?: string;
    tags?: string[];
    mentions?: string[];
    isPublic?: boolean;
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
        isPublic: {
            type: Boolean,
            required: true,
            default: true,
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
