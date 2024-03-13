import { getBy, getById } from "./factory-service.js";

export const getUserByUsername = (username) => getBy('users', 'username', username);
export const getUserById = (id) => getById('users', id);