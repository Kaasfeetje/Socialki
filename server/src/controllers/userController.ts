import { Request, Response } from "express";
import { BadRequestError } from "../common/errors/BadRequestError";
import { NotFoundError } from "../common/errors/NotFoundError";
import { User } from "../models/userModel";

export const getAllUsers = async (req: Request, res: Response) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await User.countDocuments();

    const pages = Math.ceil(count / pageSize);

    if (page > pages)
        throw new NotFoundError(
            `No content found on page ${page} of ${pages} pages`
        );

    const users = await User.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.status(200).send({
        data: users,
        page,
        pages,
    });
};

export const createUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
    if (!validEmail) throw new BadRequestError("Must give a valid email");

    if (!password) throw new BadRequestError("Password is required");
    if (!username || (await User.findOne({ username: username.toLowerCase() })))
        throw new BadRequestError("Username must be unique and is required");
    if (!email || (await User.findOne({ email: email.toLowerCase() })))
        throw new BadRequestError("Email must be unique and is required");

    const user = await User.build({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
    });
    await user.save();

    res.status(201).send({ data: user });
};

export const getUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);

    if (!user) throw new NotFoundError("No user found");

    res.status(200).send({ data: user });
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);

    if (!user) throw new NotFoundError("No user found");

    const { username, email, role } = req.body;
    if (email) {
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
        if (!validEmail) throw new BadRequestError("Must give a valid email");
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).send({ data: user });
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) throw new NotFoundError("No user found");

    await User.findByIdAndDelete(user._id);

    res.status(204).send({});
};
