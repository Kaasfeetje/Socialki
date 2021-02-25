import mongoose from "mongoose";
import dotenv from "dotenv";
import { Follow } from "./models/followingModel";
import { Like } from "./models/likeModel";
import { Post } from "./models/postModel";
import { Tag } from "./tag/tagModel";
import { User } from "./models/userModel";

dotenv.config();

const start = async () => {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
    if (!process.env.MONGO_PASSWORD)
        throw new Error("MONGO_PASSWORD must be defined");

    await mongoose.connect(
        process.env.MONGO_URI.replace("<password>", process.env.MONGO_PASSWORD),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    );
    console.log("Connected to MongoDB");
};

const destroyData = async () => {
    try {
        await Follow.deleteMany();
        await Like.deleteMany();
        await Post.deleteMany();
        await Tag.deleteMany();
        await User.deleteMany();

        console.log("Data deleted");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
start();

if (process.argv[2] === "-d") {
    destroyData();
} else {
    // importData();
}
