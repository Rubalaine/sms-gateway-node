import {exec} from 'child_process';

export const termuxSmsGen = (message, numbers) => {
    const parsedNumbers = numbers.join(',');
    return `termux-sms-send -n ${parsedNumbers} "${message}"`;
}

export const termuxSmsSend = (content) => {
    exec(content, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
}