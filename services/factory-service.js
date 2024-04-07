import { registerError } from "./error-service.js";
import { qb } from "../qb.js";

export const getAll = async (table) => {
    try {
        const data = await qb(table).select('*');
        return data;
    } catch (error) {
        registerError(`Error getting all ${table}`, error);
    }
}

export const getById = async (table, id) => {
    try {
        const data = await qb(table).where('id', id).first();
        return data;
    } catch (error) {
        registerError(`Error getting ${table} by id`, error);
    }
}

export const getMultiple = async (table, ids) => {
    try {
        const data = await qb(table).whereIn('id', ids);
        return data;
    } catch (error) {
        registerError(`Error getting multiple ${table}`, error);
    }
}

export const getBy = async (table, column, value) => {
    try {
        const data = await qb(table).where(column, value);
        return data;
    } catch (error) {
        registerError(`Error getting ${table} by ${column}`, error);
    }
}
export const updateMultiple = async (table, ids, data) => {
    try {
        const updated = await qb(table).whereIn('id', ids).update(data);
        return updated;
    } catch (error) {
        registerError(`Error updating multiple ${table}`, error);
    }
}