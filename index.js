import 'dotenv/config.js';
import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import {getPatientsWithPendingAppointmentsInDate, getPatientsWithAppointmentsInDate} from './services/patient-service.js';
import { termuxSmsGen, termuxSmsSend } from './utils/termux-utils.js';
import { registerError } from './error-service.js';

const TODAY = new Date();


const __dirname = path.resolve();

let config;
try {
     config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
} catch (error) {
    registerError('Error reading config file', error);
    process.exit(1);
}

// delayed appointments
cron.schedule(config.delayed_appointment.send_at_cron, async () => {
    try {
        const alertDate = new Date(TODAY)
        alertDate.setDate(TODAY.getDate() + config.delayed_appointment.look_for_days);
        const patients = await getPatientsWithPendingAppointmentsInDate(alertDate);
        console.log(patients.length);
        if(patients.length){
            console.log(`[${new Date().toISOString()}] Sending delayed appointment SMS`);
            const message = config.delayed_appointment.alert_message;
            const numbers = patients.map(patient => patient.phoneNumber);
            const content = termuxSmsGen(message, numbers);
            termuxSmsSend(content);
        }
    } catch (error) {
        registerError('Error sending delayed appointment SMS', error);
    }
});

// scheduled appintments
cron.schedule(config.scheduled_appointment.send_at_cron, async () => {
    try {
        const alertDate = new Date(TODAY)
        alertDate.setDate(TODAY.getDate() + config.scheduled_appointment.look_for_days);
        const patients = await getPatientsWithPendingAppointmentsInDate(alertDate);
        console.log(patients.length);
        if(patients.length){
            console.log(`[${new Date().toISOString()}] Sending scheduled appointment SMS`);
            const message = config.scheduled_appointment.alert_message;
            const numbers = patients.map(patient => patient.phoneNumber);
            const content = termuxSmsGen(message, numbers);
            termuxSmsSend(content);
        }
    } catch (error) {
        registerError('Error sending scheduled appointment SMS', error);
    }
});