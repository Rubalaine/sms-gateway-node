import { qb } from "../qb.js";
import { TABLES } from "../utils/constants.js";
import { registerError } from "./error-service.js";

export const getConfig = async () => {
    try {
        const config = await qb(TABLES.CONFIG).first();
        return config;
    } catch (error) {
        registerError('Error getting config', error)
    }
};
export const updateConfig = async (config) => {
    try {
        if(config?.id){
           return await qb(TABLES.CONFIG).update(config).where('id', config.id);
        }
        return await qb(TABLES.CONFIG).insert(config);
    } catch (error) {
        registerError('Error updating config', error);
    }
};