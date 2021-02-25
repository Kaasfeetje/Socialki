import mongoose from "mongoose";

interface LikeAttrs {
    user: string;
    post: string;
}

export interface LikeDoc extends mongoose.Document {
    user: string;
    post: string;
}

interface LikeModel extends mongoose.Model<LikeDoc> {
    build(attrs: LikeAttrs): LikeDoc;
}

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Post",
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
    }
);

likeSchema.statics.build = (attrs: LikeAttrs) => {
    return new Like(attrs);
};

const Like = mongoose.model<LikeDoc, LikeModel>("Like", likeSchema);

export { Like };
