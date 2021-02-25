import mongoose from "mongoose";

import { Password } from "../../common/Password";
import { ROLES } from "../../common/constants/Roles";

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
    isPublic?: boolean;
}

interface UserDoc extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    profileImage: string;
    role: string;
    isPublic: boolean;
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
            default: "uploads/default.jpg",
        },
        role: {
            type: String,
            required: true,
            default: ROLES.user,
            enum: [ROLES.admin, ROLES.moderator, ROLES.user],
        },
        description: {
            type: String,
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
