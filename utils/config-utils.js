import cron from 'node-cron';
import {getConfigAndMarkAsRead} from '../services/config-service.js';
import {genExpression} from './cron-util.js';
import {sendDelayedMessages, sendScheduledMessages} from '../services/sms-service.js';
import {CRONS} from './constants.js';

export const loadAndStartConfig = async () =>{
    const config = await getConfigAndMarkAsRead();
    if(!config) return;
    
    console.log(`[${new Date().toISOString()}] Config file updated`);
    const scheduled_expression = genExpression(config.scheduled_time);
    const delayed_expression = genExpression(config.delayed_time);
    console.log(`[${new Date().toISOString()}] Scheduled cron: ${config.scheduled_time} | Delayed cron: ${config.delayed_time}`);
    cron.schedule(scheduled_expression, async () => {
        await sendScheduledMessages(config.scheduled_message);
        
    }, {
        name: CRONS.SCHEDULED
    });
    cron.schedule(delayed_expression, async () => {
        await sendDelayedMessages(config.delayed_message);
    },{
        name: CRONS.DELAYED
    });
}