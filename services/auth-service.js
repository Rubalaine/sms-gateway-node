import { qb } from "../qb.js";
import { registerError } from "./error-service.js";
import jwt from "jsonwebtoken";
import myCrypto from "../utils/crypto-utils.js";

export const login = async (username, password) => {
    try {
        const user = await qb('users').where({ username }).first();
        if(!user) return null;
        const isMatch = myCrypto.comparePassword(password, user.password);
        if(!isMatch) return null;
        delete user.password; 
        user.token = generateToken(user);
        return user;
    } catch (error) {
        registerError('Error logging in', error);
    }
};

export const register = async (user) => {
    try {
        const passwordHash = myCrypto.hashPassword(user.password, 10);
        user.password = passwordHash;
        console.table(user);
        const newUser = await qb('users').insert(user).returning('*');
        const senUser = newUser[0];
        senUser.password = undefined;
        senUser.token = generateToken(senUser);
        return senUser;
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