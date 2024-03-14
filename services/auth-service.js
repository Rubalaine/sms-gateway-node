import { qb } from "../qb.js";
import crypto from 'crypto';
import { registerError } from "./error-service.js";
import jwt from "jsonwebtoken";

const cipherKey = crypto.createHash(process.env.HASH_ALGO);
export const login = async (username, password) => {
    try {
        password = cipherKey.update(password).digest('hex');
        const user = await qb('users').where({ username, password }).first();
        if(!user) return null;
        delete user.password; 
        user.token = generateToken(user);
        return user;
    } catch (error) {
        registerError('Error logging in', error);
    }
};

export const register = async (user) => {
    try {
        user.password = cipherKey.update(user.password).digest('hex');
        const newUser = await qb('users').insert(user).returning('*');
        delete newUser.password;
        newUser.token = generateToken(newUser);
        return newUser;
    }
    catch (error) {
        registerError('Error registering user', error);
    }
};

const generateToken = (user) => {
    try {
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION});
        return token;
    } catch (error) {
        registerError('Error generating token', error);
    }
};

export const decodeUser = (token) => {
    try {
        const user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        return user;
    } catch (error) {
        registerError('Error verifying token', error);
    }
};