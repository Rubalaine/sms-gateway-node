import Fastify from 'fastify';
import { getAllPatients, getPatientById,getPatientsWithAppointmentsInDate, getPatientsWithAppointmentsInDateRange } from './services/patient-service.js';
import {getAllDoctors, getDoctorById} from './services/doctors-service.js';
import { registerError } from './services/error-service.js';
import { getUserByUsername } from './services/users-service.js';
import { decodeUser, login, register } from './services/auth-service.js';
import cors from '@fastify/cors';
import { getConfig, updateConfig } from './services/config-service.js';

export const app = Fastify({
    logger: Boolean(process.env.DEVELOPMENT) 
});

app.register(cors, {
    origin: '*'
});

app.addHook('onRequest', async (request, reply) => {
    try {
        if(
            request.url === '/login' 
            || request.url === '/register' 
            || request.url === "/"
            || request.url.startsWith('/public')
            ) 
                return;
        const token = request.headers['authorization'];
        if(!token) return reply.code(401).send('Unauthorized');
        const user = await decodeUser(token);
        if(!user) return reply.code(401).send('Unauthorized');
        request.user = user;
    } catch (error) {
        reply.code(401).send('Unauthorized');
    }
});
app.get('/patients', async (request, reply) => {
    try {
        const patients = await getAllPatients();
        reply.code(200).send(patients);
    } catch (error) {
        registerError('Error getting patients', error);
        reply.code(500).send('Error getting patients');
    }
});
app.get('/patients/:id', async (request, reply) => {
    try {
        const patient = await getPatientById(request.params.id);
        if(!patient) return reply.code(404).send('Patient not found');
        reply.code(200).send(patient);
    } catch (error) {
        console.error(error)
        registerError('Error getting patient', error);
        reply.code(500).send('Error getting patient');
    }
});
app.get('/doctors', async (request, reply) => {
    try {
        const doctors = await getAllDoctors();
        reply.code(200).send(doctors);
    } catch (error) {
        registerError('Error getting doctors', error);
        reply.code(500).send('Error getting doctors');
    }
});

app.get('/doctors/:id', async (request, reply) => {
    try {
        const doctor = await getDoctorById(request.params.id);
        if(!doctor) return reply.code(404).send('Doctor not found');
        reply.code(200).send(doctor);
    } catch (error) {
        registerError('Error getting doctor', error);
        reply.code(500).send('Error getting doctor');
    }
});

app.get('/appointments/dated/:date', async (request, reply) => {
    try {
        const date = request.params.date;
        if(!date) return reply.code(400).send('Date is required');
        const appointments = await getPatientsWithAppointmentsInDate(date);
        reply.code(200).send(appointments);
    } catch (error) {
        registerError('Error getting appointments', error);
        reply.code(500).send('Error getting appointments');
    }
});
// get ranged appointmnents
app.get('/appointments/ranged/:start/:end', async (request, reply) => {
    try {
        const start = request.params.start;
        const end = request.params.end;
        if(!start || !end) return reply.code(400).send('Start and end dates are required');
        const appointments = await getPatientsWithAppointmentsInDateRange(start, end);
        reply.code(200).send(appointments);
    } catch (error) {
        registerError('Error getting appointments', error);
        reply.code(500).send('Error getting appointments');
    }
});

// config
app.get('/config', async (request, reply) => {
    try {
        const config = await getConfig();
        reply.code(200).send(config || {});
    } catch (error) {
        registerError('Error getting config', error);
    }
});

app.put('/config', async (request, reply) => {
    try {
        const config = request.body;
        console.table(config);
        await updateConfig(config);
        reply.code(204).send();
    } catch (error) {
        registerError('Error updating config', error);
    }
});

app.post('/login', async (request, reply) => {
    try {
        const {username, password} = request.body;
        const user = await getUserByUsername(username);
        console.log(user);
        if(!user.length) return reply.code(403).send('Invalid credentials');
        const userLogin = await login(username, password);
        if(!login) return reply.code(403).send('Invalid credentials');
        reply.code(200).send(userLogin);
    } catch (error) {
        registerError('Error logging in', error);
        reply.code(500).send('Error logging in');
    }
});
app.post('/register', async (request, reply) => {
    try {
        const user = request.body;
        const newUser = await register(user);
        reply.code(201).send(newUser);
    } catch (error) {
        registerError('Error registering user', error);
        reply.code(500).send('Error registering user');
    }
});