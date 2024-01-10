import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { User } from '../models/user';
import bcrypt from 'bcryptjs'
import { assertIsDefined } from "../util/assertIsDefined";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try {
        // if (!authenticatedUserId) {
        //     throw createHttpError(401, 'User not authenticated');
        // }
        assertIsDefined(authenticatedUserId);

        const user = await User.findOne({ where: { id: authenticatedUserId } }) as typeof User | null;
        
        if (!user) {
            throw createHttpError(401, 'Invalid credentials');
        }
        
        const userReturn: User = { email: user.email, username: user.username };

        res.status(200).json(userReturn);
    } catch (error) {
        next(error);
    }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> =async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, 'Parameters missing');
        }

        const existingUsername = await User.findOne({ where: { username: username } }) as typeof User | null;

        if (existingUsername) {
            throw createHttpError(409, 'Username already taken. Please choose a different one or log in instead.');
        }

        const existingEmail = await User.findOne({ where: { username: username } }) as typeof User | null;

        if (existingEmail) {
            throw createHttpError(409, 'A user with this email address already exists. Please log in instead.');
        }

        const hashedPassword = await bcrypt.hash(passwordRaw, 10);

        const newUser = new User({
            email: email,
            name: name,
            password: hashedPassword
        });
        const result = await newUser.save();

        req.session.userId = newUser.id;

        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
}

interface LoginBody{
    email?: string,
    password?: string,
}

interface User{
    email?: string,
    username?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            throw createHttpError(400, 'Parameters missing');
        }

        const user = await await User.findOne({ where: { email: email } }) as typeof User | null;
        
        if (!user) {
            throw createHttpError(401, 'Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, 'Invalid credentials');
        }

        req.session.userId = user.id;
        const userReturn: User = { email: user.email, username: user.username };
        res.status(201).json(userReturn);
    } catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
}