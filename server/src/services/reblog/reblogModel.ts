import mongoose from "mongoose";

interface ReblogAttrs {
    user: string;
    post: string;
}

export interface ReblogDoc extends mongoose.Document {
    user: string;
    post: string;
}

interface ReblogModel extends mongoose.Model<ReblogDoc> {
    build(attrs: ReblogAttrs): ReblogDoc;
}

const reblogSchema = new mongoose.Schema(
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

reblogSchema.statics.build = (attrs: ReblogAttrs) => {
    return new Reblog(attrs);
};

const Reblog = mongoose.model<ReblogDoc, ReblogModel>("Reblog", reblogSchema);

export { Reblog };
