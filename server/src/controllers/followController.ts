import { Request, Response } from "express";
import { BadRequestError } from "../common/errors/BadRequestError";
import { NotFoundError } from "../common/errors/NotFoundError";
import { Follow } from "../models/followingModel";
import { User } from "../models/userModel";

export const createFollow = async (req: Request, res: Response) => {
    const follower = req.currentUser!.id;
    const { followed } = req.body;

    const user = await User.findById(followed);
    if (!user) throw new NotFoundError("Can't follow a non existent account");

    const existingFollow = await Follow.findOne({ follower, followed });
    if (existingFollow)
        throw new BadRequestError("You are already following this account");

    const follow = Follow.build({ follower, followed });
    await follow.save();

    res.status(201).send({ data: user });
};

export const deleteFollow = async (req: Request, res: Response) => {
    const follower = req.currentUser!.id;
    const { followed } = req.body;

    const user = await User.findById(followed);
    if (!user) throw new NotFoundError("Can't follow a non existent account");

    const existingFollow = await Follow.findOne({ follower, followed });
    if (!existingFollow)
        throw new BadRequestError("You are not following this account");

    await Follow.findByIdAndDelete(existingFollow._id);

    res.status(204).send({});
};
