import { registerError } from "./error-service.js";
import { qb } from "../qb.js";
import { TABLES } from "../utils/constants.js";
import { getAll, getById, getMultiple } from "./factory-service.js";

export const getAllPatients = () => getAll(TABLES.PATIENTS);

export const getPatientById =(id) => getById(TABLES.PATIENTS, id);

export const getMultiplePatients = (ids) => getMultiple(TABLES.PATIENTS, ids);

export const getPatientsWithAppointmentsInDate = async (date) => {
    try {
        const patients = await qb(TABLES.PATIENTS)
        .join(TABLES.APPOINTMENTS, `${TABLES.PATIENTS}.id`, `${TABLES.APPOINTMENTS}.patientId`)
        .where(`${TABLES.APPOINTMENTS}.appointmentDate`, date)
        .select(
            `${TABLES.PATIENTS}.*`
            ,`${TABLES.APPOINTMENTS}.status`
            ,`${TABLES.APPOINTMENTS}.appointmentDate`
            ,`${TABLES.APPOINTMENTS}.id as appointmentId`
        );
        return patients;
    } catch (error) {
        registerError('Error getting patients with appointments in date', error);
    }
}
export const getPatientsWithAppointmentsInDateRange = async (start, end) => {
    try {
        const patients = await qb(TABLES.PATIENTS)
        .join(TABLES.APPOINTMENTS, `${TABLES.PATIENTS}.id`, `${TABLES.APPOINTMENTS}.patientId`)
        .whereBetween(`${TABLES.APPOINTMENTS}.appointmentDate`, [start, end])
        .select(
            `${TABLES.PATIENTS}.*`
            ,`${TABLES.APPOINTMENTS}.status`
            ,`${TABLES.APPOINTMENTS}.appointmentDate`
            ,`${TABLES.APPOINTMENTS}.id as appointmentId`
        );
        return patients;
    } catch (error) {
        registerError('Error getting patients with appointments in date range', error);
    }
}
export const getPatientsWithPendingAppointmentsInDate = async (date) => {
    try {
        const patients = await qb(TABLES.PATIENTS)
        .join(
            TABLES.APPOINTMENTS
            ,`${TABLES.PATIENTS}.id`
            ,`${TABLES.APPOINTMENTS}.patientId`)
        .where(`${TABLES.APPOINTMENTS}.appointmentDate`, date)
        .andWhere(`${TABLES.APPOINTMENTS}.status`, 'PENDING')
        .select(
            `${TABLES.PATIENTS}.*`
            ,`${TABLES.APPOINTMENTS}.id as appointmentId`
        );
        return patients;
    } catch (error) {
        registerError('Error getting patients with pending appointments in date', error);
    }
}