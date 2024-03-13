import 'dotenv/config.js';
import { qb } from "../qb.js"
import {registerError} from '../error-service.js';

const createPatientModel = async () => {
    try {
        await qb.schema.createTableIfNotExists('patients', (table) => {
            table.increments('id');
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50);
            table.date('dob');
            table.enu('gender', ['M', 'F']);
            table.string('address', 100);
            table.string('phoneNumber', 25);
            table.timestamps().defaultTo(qb.fn.now());
        });
    } catch (error) {
        registerError('Error creating patient model', error);
    } finally {
        // qb.destroy();
    }
}

const createDoctorModel = async () => {
    try {
        await qb.schema.createTableIfNotExists('doctors', (table) => {
            table.increments('id');
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50);
            table.date('dob');
            table.string('specialty', 50);
            table.string('phoneNumber', 25);
            table.timestamps().defaultTo(qb.fn.now());
        });
    } catch (error) {
        registerError('Error creating doctor model', error);
    } finally {
        // qb.destroy();
    }
}

const createAppointmentModel = async () =>{
    try {
        await qb.schema.createTableIfNotExists('appointments', (table) => {
            table.increments('id');
            table.integer('patientId').unsigned().notNullable().references('id').inTable('patients');
            table.integer('doctorId').unsigned().notNullable().references('id').inTable('doctors');
            table.date('appointmentDate').notNullable();
            table.string('reason', 100);
            table.enu('status', ['PENDING', 'COMPLETED', 'CANCELLED'])
            table.timestamps().defaultTo(qb.fn.now());
        })
    } catch (error) {
        registerError('Error creating appointment model', error);
    }
}

const createUserModel = async () => {
    try {
        await qb.schema.createTableIfNotExists('users', (table) => {
            table.increments('id');
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50);
            table.string('username', 50).notNullable().unique();
            table.string('password', 100).notNullable();
            table.string('role', 20).notNullable();
            table.timestamps().defaultTo(qb.fn.now());
        });
    } catch (error) {
        registerError('Error creating user model', error);
    } finally {
        qb.destroy();
    }
}

// async for loop
const createModels = async () => {
    const models = [createPatientModel, createDoctorModel, createAppointmentModel, createUserModel];
    for (const model of models) {
        await model();
    }
}
createModels().then(() => {
    console.log('Models created successfully');
}).catch((error) => {
    console.log('Error creating models', error);
});