import { termuxSmsGen } from "../utils/termux-utils.js";

export const registerError = (message, error, sms = false) => {
    if(message)
        console.error(message);
    console.error(error);
    if (sms) {
        const message = termuxSmsGen(`[${new Date().toISOString()}] Error: ${message}`, ['842798702']);
        termuxSmsSend(message);
    }
};