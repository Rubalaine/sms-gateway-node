import {TABLES, APPOINTMENT_STATUS} from '../utils/constants.js';
import {getAll, getBy, getById, getMultiple, updateMultiple} from './factory-service.js';
import {registerError} from './error-service.js';

export const getAllAppointments = () => getAll(TABLES.APPOINTMENTS);

export const getAppointmentById = (id) => getById(TABLES.APPOINTMENTS, id);

export const getMultipleAppointments = (ids) => getMultiple(TABLES.APPOINTMENTS, ids);

export const getAllAppointmentsByDate = (date) => getBy(TABLES.APPOINTMENTS, 'appointmentDate', date);

export const getPatientAppointments = (patientId) => getBy(TABLES.APPOINTMENTS, 'patientId', patientId);

export const getDoctorAppointments = (doctorId) => getBy(TABLES.APPOINTMENTS, 'doctorId', doctorId);

export const markAsCompleted = (ids) => {
    try {
        updateMultiple(TABLES.APPOINTMENTS, ids, {status: APPOINTMENT_STATUS.COMPLETED});
    } catch (error) {
        registerError('Error marking message as sent', error);
    }
}