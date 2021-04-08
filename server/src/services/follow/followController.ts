import { Request, Response } from "express";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Follow } from "./followingModel";
import { User, UserTokenPayload } from "../user/userModel";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserTokenPayload;
        }
    }
}

export const followHandler = async (req: Request, res: Response) => {
    const follower = req.currentUser!.id;
    const { followed } = req.body;

    const user = await User.findById(followed);
    if (!user) throw new NotFoundError("Can't follow a non existent account");

    const existingFollow = await Follow.findOne({ follower, followed });
    if (existingFollow) {
        await Follow.findByIdAndDelete(existingFollow._id);
        return res.status(204).send({});
    }

    const follow = Follow.build({
        follower,
        followed,
        accepted: user.isPublic ? true : false,
    });
    await follow.save();

    res.status(201).send({ data: follow });
};

export const acceptFollow = async (req: Request, res: Response) => {
    const existingFollow = await Follow.findById(req.params.followId);
    if (!existingFollow) throw new NotFoundError("No follow request");

    existingFollow.accepted = true;
    await existingFollow.save();

    res.status(200).send({ data: existingFollow });
};

export const rejectFollow = async (req: Request, res: Response) => {
    const existingFollow = await Follow.findById(req.params.followId);
    if (!existingFollow) throw new NotFoundError("No follow request");

    await Follow.findByIdAndDelete(existingFollow._id);

    res.status(204).send({});
};
