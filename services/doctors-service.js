import { registerError } from "../error-service.js";
import { TABLES } from "../utils/constants.js";
import { getAll, getById } from "./factory-service.js";

export const getAllDoctors = () => getAll(TABLES.DOCTORS);

export const getDoctorById = (id) => getById(TABLES.DOCTORS, id);

export const getMultipleDoctors = (ids) => getMultiple(TABLES.DOCTORS, ids);

export const getDoctorsWithAppointmentsInDate = async (date) => {
    try {
        const doctors = await qb(TABLES.DOCTORS).join(TABLES.APPOINTMENTS, `${TABLES.DOCTORS}.id`, `${TABLES.APPOINTMENTS}.doctorId`).where(`${TABLES.APPOINTMENTS}.appointmentDate`, date).select(`${TABLES.DOCTORS}.*`);
        return doctors;
    } catch (error) {
        registerError('Error getting doctors with appointments in date', error);
    }
}