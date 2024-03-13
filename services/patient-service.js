import { registerError } from "./error-service.js";
import { qb } from "../qb.js";
import { TABLES } from "../utils/constants.js";
import { getAll, getById, getMultiple } from "./factory-service.js";

export const getAllPatients = () => getAll(TABLES.PATIENTS);

export const getPatientById =(id) => getById(TABLES.PATIENTS, id);

export const getMultiplePatients = (ids) => getMultiple(TABLES.PATIENTS, ids);

export const getPatientsWithAppointmentsInDate = async (date) => {
    try {
        const patients = await qb(TABLES.PATIENTS).join(TABLES.APPOINTMENTS, `${TABLES.PATIENTS}.id`, `${TABLES.APPOINTMENTS}.patientId`).where(`${TABLES.APPOINTMENTS}.appointmentDate`, date).select(`${TABLES.PATIENTS}.*`);
        return patients;
    } catch (error) {
        registerError('Error getting patients with appointments in date', error);
    }
}
export const getPatientsWithPendingAppointmentsInDate = async (date) => {
    try {
        const patients = await qb(TABLES.PATIENTS).join(TABLES.APPOINTMENTS, `${TABLES.PATIENTS}.id`, `${TABLES.APPOINTMENTS}.patientId`).where(`${TABLES.APPOINTMENTS}.appointmentDate`, date).andWhere(`${TABLES.APPOINTMENTS}.status`, 'PENDING').select(`${TABLES.PATIENTS}.*`);
        return patients;
    } catch (error) {
        registerError('Error getting patients with pending appointments in date', error);
    }
}