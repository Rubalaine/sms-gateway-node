import { qb } from "../qb.js";
import crypto from 'crypto';
import { registerError } from '../error-service.js';


const cipherKey = crypto.createHash(process.env.HASH_ALGO);
export const login = async (username, password) => {
    try {
        password = cipherKey.update(password);
        const user = await qb('users').where({ username, password }).first();
        return user;
    } catch (error) {
        registerError('Error logging in', error);
    }
};

export const register = async (user) => {
    try {
        user.password = cipherKey.update(user.password);
        const newUser = await qb('users').insert(user).returning('*');
        return newUser;
    }
    catch (error) {
        registerError('Error registering user', error);
    }
};