import { termuxSmsGen } from "../utils/termux-utils.js";

export const registerError = (message, error, sms = true) => {
    console.error(message);
    console.error(error);
    if (sms) {
        const message = termuxSmsGen(`[${new Date().toISOString()}] Error: ${message}`, ['842798702']);
        termuxSmsSend(message);
    }
};