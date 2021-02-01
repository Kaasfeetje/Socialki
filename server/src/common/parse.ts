import { Tag } from "../models/tagModel";
import { User } from "../models/userModel";

export const parseTags = async (message: string) => {
    const regex = /^#\w+$/;

    const words = message.split(" ");

    const tags = words.filter((word) => regex.test(word));

    return await Promise.all(
        tags.map(async (tag) => {
            const existingTag = await Tag.findOne({
                name: tag.replace("#", ""),
            });

            if (!existingTag) {
                const createdTag = await Tag.build({
                    name: tag.replace("#", ""),
                });

                await createdTag.save();

                return createdTag._id;
            }

            return existingTag;
        })
    );
};

export const parseMentions = async (message: string) => {
    const regex = /^@\w+$/;

    const words = message.split(" ");

    const mentions = words.filter((word) => regex.test(word));

    const m = await Promise.all(
        mentions.map(async (user) => {
            const existingUser = await User.findOne({
                username: user.replace("@", ""),
            });

            if (!existingUser) return undefined;
            return existingUser;
        })
    );

    return m.filter((mention) => mention !== undefined);
};
