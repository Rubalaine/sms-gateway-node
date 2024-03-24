import { termuxSmsGen, termuxSmsSend } from "../utils/termux-utils.js";
import { registerError } from "./error-service.js";
import { getPatientsWithPendingAppointmentsInDate } from "./patient-service.js";

export const sendDelayedMessages = async (message) =>{ 
    try {
        const today = new Date();
        const alertDate = new Date();
        alertDate.setDate(today.getDate() - 1);
        const patients = await getPatientsWithPendingAppointmentsInDate(alertDate);
        console.log(patients.length);
        if(patients.length){
            console.log(`[${new Date().toISOString()}] Sending delayed appointment SMS`);
            const numbers = patients.map(patient => patient.phoneNumber);
            const content = termuxSmsGen(message, numbers);
            termuxSmsSend(content);
        }
    } catch (error) {
        registerError('Error sending delayed appointment SMS', error);
    }
}

export const sendScheduledMessages = async (message) => {
    try {
        const today = new Date();
        const alertDate = new Date();
        alertDate.setDate(today.getDate() + 1);
        const patients = await getPatientsWithPendingAppointmentsInDate(alertDate);
        console.log(patients.length);
        if(patients.length){
            console.log(`[${new Date().toISOString()}] Sending scheduled appointment SMS`);
            const numbers = patients.map(patient => patient.phoneNumber);
            const content = termuxSmsGen(message, numbers);
            termuxSmsSend(content);
        }
    } catch (error) {
        registerError('Error sending scheduled appointment SMS', error);
    }
}