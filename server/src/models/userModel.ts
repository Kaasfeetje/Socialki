import mongoose from "mongoose";

import { Password } from "../common/Password";
import { ROLES } from "../common/Roles";

export interface UserTokenPayload {
    email: string;
    username: string;
    role: string;
    id: string;
}

interface UserAttrs {
    email: string;
    username: string;
    password: string;
    profileImage?: string;
    role?: string;
    description?: string;
}

interface UserDoc extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    profileImage: string;
    role: string;
    description?: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
            required: true,
            default: "default.jpg",
        },
        role: {
            type: String,
            required: true,
            default: ROLES.user,
            enum: ROLES,
        },
        description: {
            type: String,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
            },
        },
    }
);

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
