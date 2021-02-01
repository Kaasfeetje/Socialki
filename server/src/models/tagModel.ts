import mongoose from "mongoose";

interface TagAttrs {
    name: string;
}

interface TagDoc extends mongoose.Document {
    name: string;
}

interface TagModel extends mongoose.Model<TagDoc> {
    build(attrs: TagAttrs): TagDoc;
}

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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

tagSchema.statics.build = (attrs: TagAttrs) => {
    return new Tag(attrs);
};

const Tag = mongoose.model<TagDoc, TagModel>("Tag", tagSchema);

export { Tag };
