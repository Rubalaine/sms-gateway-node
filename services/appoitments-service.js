import { TABLES } from "../utils/constants.js";
import { getAll, getBy, getById, getMultiple } from "./factory-service.js";

export const getAllAppointments = () => getAll(TABLES.APPOINTMENTS);

export const getAppointmentById = (id) => getById(TABLES.APPOINTMENTS, id);

export const getMultipleAppointments = (ids) => getMultiple(TABLES.APPOINTMENTS, ids);

export const getAllAppointmentsByDate = (date) => getBy(TABLES.APPOINTMENTS, 'appointmentDate', date);

export const getPatientAppointments = (patientId) => getBy(TABLES.APPOINTMENTS, 'patientId', patientId);

export const getDoctorAppointments = (doctorId) => getBy(TABLES.APPOINTMENTS, 'doctorId', doctorId);