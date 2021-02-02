import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../common/errors/BadRequestError";
import { NotFoundError } from "../common/errors/NotFoundError";
import { Password } from "../common/Password";

import { User, UserTokenPayload } from "../models/userModel";

const signToken = (payload: UserTokenPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const signup = async (req: Request, res: Response) => {
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

    const token = signToken({
        email: user.email,
        username: user.username,
        role: user.role,
        id: user._id,
    });

    res.status(201).cookie("jwt", token).send({ data: user });
};

export const signin = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    let user;
    if (email) {
        user = await User.findOne({ email: email.toLowerCase() });
    } else if (username) {
        user = await User.findOne({ username: username.toLowerCase() });
    }

    if (!user) {
        throw new NotFoundError("Invalid credentials");
    }

    const hasCredentials = await Password.compare(user.password, password);
    if (!hasCredentials) throw new Error("Invalid credentials");

    const token = signToken({
        email: user.email,
        username: user.username,
        role: user.role,
        id: user._id,
    });

    res.status(200).cookie("jwt", token).send({ data: user });
};

export const signout = (req: Request, res: Response) => {
    res.status(200).clearCookie("jwt").send({});
};

export const updateMe = async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser?.id);

    if (!user) throw new NotFoundError("No user found");

    const { username, email, description, profileImage } = req.body;
    if (email) {
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
        if (!validEmail) throw new BadRequestError("Must give a valid email");
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.description = description || user.description;
    user.profileImage = profileImage || user.profileImage;
    await user.save();

    const token = signToken({
        email: user.email,
        username: user.username,
        role: user.role,
        id: user._id,
    });

    res.status(200).cookie("jwt", token).send({ data: user });
};
