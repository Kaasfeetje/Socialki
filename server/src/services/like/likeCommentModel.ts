import mongoose from "mongoose";

interface LikeCommentAttrs {
    user: string;
    comment: string;
}

export interface LikeCommentDoc extends mongoose.Document {
    user: string;
    comment: string;
}

interface LikeCommentModel extends mongoose.Model<LikeCommentDoc> {
    build(attrs: LikeCommentAttrs): LikeCommentDoc;
}

const likeCommentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Comment",
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

likeCommentSchema.statics.build = (attrs: LikeCommentAttrs) => {
    return new LikeComment(attrs);
};

const LikeComment = mongoose.model<LikeCommentDoc, LikeCommentModel>(
    "LikeComment",
    likeCommentSchema
);

export { LikeComment };
