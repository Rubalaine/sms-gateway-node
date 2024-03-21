import 'dotenv/config.js';
import { qb } from "../qb.js"
import { registerError } from '../services/error-service.js';

const createPatientModel = async () => {
    try {
        const hasTable = await qb.schema.hasTable('patients');
        if (hasTable) return;
        await qb.schema.createTable('patients', (table) => {
            table.increments('id');
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50);
            table.date('dob');
            table.enu('gender', ['M', 'F']);
            table.string('address', 100);
            table.string('phoneNumber', 25);
            table.timestamps();
        });
    } catch (error) {
        registerError('Error creating patient model', error);
    } finally {
        // qb.destroy();
    }
}

const createDoctorModel = async () => {
    try {
        const hasTable = await qb.schema.hasTable('doctors');
        if (hasTable) return;
        await qb.schema.createTable('doctors', (table) => {
            table.increments('id');
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50);
            table.date('dob');
            table.string('specialty', 50);
            table.string('phoneNumber', 25);
            table.timestamps();
        });
    } catch (error) {
        registerError('Error creating doctor model', error);
    } finally {
        // qb.destroy();
    }
}

const createAppointmentModel = async () =>{
    try {
        const hasTable = await qb.schema.hasTable('appointments');
        if (hasTable) return;
        await qb.schema.createTable('appointments', (table) => {
            table.increments('id');
            table.integer('patientId').unsigned().notNullable().references('id').inTable('patients');
            table.integer('doctorId').unsigned().notNullable().references('id').inTable('doctors');
            table.date('appointmentDate').notNullable();
            table.string('reason', 100);
            table.enu('status', ['PENDING', 'COMPLETED', 'CANCELLED'])
            table.timestamps();
        })
    } catch (error) {
        registerError('Error creating appointment model', error);
    }
}

const createUserModel = async () => {
    try {
        const hasTable = await qb.schema.hasTable('users');
        if (hasTable) return;
        await qb.schema.createTable('users', (table) => {
            table.increments('id');
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50);
            table.string('username', 50).notNullable().unique();
            table.string('password', 100).notNullable();
            table.string('role', 20).notNullable();
            table.timestamps();
        });
    } catch (error) {
        registerError('Error creating user model', error);
    }
}

const createConfigModel = async () => {
    try {
        const hasTable = await qb.schema.hasTable('config');
        if (hasTable) return;
        await qb.schema.createTable('config', (table) => {
            table.increments('id');
            table.string('scheduled_time', 8);
            table.string('scheduled_message', 200);
            table.string('delayed_time', 8);
            table.string('delayed_message', 200);
            table.timestamps(true, true);
        });
    } catch (error) {
        registerError('Error creating config model', error);
    } finally {
        qb.destroy();
    }
}

// async for loop
const createModels = async () => {
    const models = [
        createPatientModel, 
        createDoctorModel, 
        createAppointmentModel, 
        createUserModel,
        createConfigModel
    ];
    for (const model of models) {
        await model();
    }
}
createModels().then(() => {
    console.log('Models created successfully');
}).catch((error) => {
    console.log('Error creating models', error);
});