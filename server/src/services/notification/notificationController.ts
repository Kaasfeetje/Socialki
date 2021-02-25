import { Request, Response } from "express";
import { Follow, FollowDoc } from "../follow/followingModel";

import { UserTokenPayload } from "../user/userModel";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserTokenPayload;
        }
    }
}

export const getNotifications = async (req: Request, res: Response) => {
    const follows = await Follow.find({ followed: req.currentUser!.id })
        .populate("follower")
        .sort({
            createdAt: -1,
        })
        .limit(10);

    const notifications = follows.map((follow: FollowDoc) => {
        return { type: "FOLLOW_NOTIFICATION", follow };
    });

    res.status(200).send({ data: notifications });
};
