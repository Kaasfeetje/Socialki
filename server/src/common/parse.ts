import { Tag } from "../services/tag/tagModel";
import { User } from "../services/user/userModel";

export const parseTags = async (message: string) => {
    const regex = /^#\w+$/;

    const words = message.split(" ");

    const tags = words.filter((word) => regex.test(word.toLowerCase()));

    return await Promise.all(
        tags.map(async (tag) => {
            const existingTag = await Tag.findOne({
                name: tag.replace("#", "").toLowerCase(),
            });

            if (!existingTag) {
                const createdTag = await Tag.build({
                    name: tag.replace("#", "").toLowerCase(),
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

    const mentions = words.filter((word) => regex.test(word.toLowerCase()));

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
