import {exec} from 'child_process';
import { PLATFORMS } from './constants.js';

export const termuxSmsGen = (message, numbers) => {
    const parsedNumbers = numbers.join(',');
    return `termux-sms-send -n ${parsedNumbers} "${message}"`;
}

export const termuxSmsSend = (content) => {
    if(process.platform !== PLATFORMS.ANDROID) return;
    exec(content, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
}