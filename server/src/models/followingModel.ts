import mongoose from "mongoose";

interface FollowAttrs {
    follower: string;
    followed: string;
    accepted?: boolean;
}

export interface FollowDoc extends mongoose.Document {
    follower: string;
    followed: string;
    accepted: boolean;
}

interface FollowModel extends mongoose.Model<FollowDoc> {
    build(attrs: FollowAttrs): FollowDoc;
}

const followSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        followed: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        accepted: {
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
    }
);

followSchema.statics.build = (attrs: FollowAttrs) => {
    return new Follow(attrs);
};

const Follow = mongoose.model<FollowDoc, FollowModel>("Follow", followSchema);

export { Follow };
