import { qb } from "../qb.js";
import { TABLES } from "../utils/constants.js";
import { registerError } from "./error-service.js";

export const getConfig = async () => {
    try {
        const config = await qb(TABLES.CONFIG).orderBy('id', 'asc').first();
        return config;
    } catch (error) {
        registerError('Error getting config', error)
    }
};
export const getConfigAndMarkAsRead = async () => {
    try {
        const config = await getConfig();
        if(config){
            await qb(TABLES.CONFIG).update({read_at: new Date()}).where('id', config.id);
        }
        return config;
    } catch (error) {
        registerError('Error getting config and marking as read', error);
    }
};
export const updateConfig = async (config) => {
    try {
        const oldConfig = await getConfig();
        if(oldConfig){
           return await qb(TABLES.CONFIG).update({...config, updated_at: new Date()}).where('id', oldConfig.id);
        }
        return await qb(TABLES.CONFIG).insert(config);
    } catch (error) {
        registerError('Error updating config', error);
    }
};