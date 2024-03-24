import 'dotenv/config.js';
import cron from 'node-cron';
import { app } from './app.js';
import {  getConfigAndMarkAsRead } from './services/config-service.js';
import { genExpression } from './utils/cron-util.js';
import { sendDelayedMessages, sendScheduledMessages } from './services/sms-service.js';
import { CRONS } from './utils/constants.js';

let firstStarted = false;


// cron for each minute
cron.schedule('* * * * *', async() => {
    const config = await getConfigAndMarkAsRead();
    if(!config) return;
    if(!firstStarted || !config?.read_at || config.updated_at > config.read_at){

        console.log(`[${new Date().toISOString()}] Config file updated`);
        const scheduled_expression = genExpression(config.scheduled_time);
        const delayed_expression = genExpression(config.delayed_time);
        console.log(`[${new Date().toISOString()}] Scheduled cron: ${scheduled_expression} | Delayed cron: ${delayed_expression}`);
        cron.schedule(scheduled_expression, async () => {
            await sendScheduledMessages(config.scheduled_appointment.alert_message);
        }, {
            name: CRONS.SCHEDULED
        });
        cron.schedule(delayed_expression, async () => {
            await sendDelayedMessages(config.delayed_appointment.alert_message);
        },{
            name: CRONS.DELAYED
        });
        firstStarted = true;
    } 
}, {
    name: CRONS.DEFAULT
});



try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }