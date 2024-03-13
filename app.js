import Fastify from 'fastify';
import { getAllPatients, getPatientById } from './services/patient-service.js';
import {getAllDoctors, getDoctorById} from './services/doctors-service.js';
import { registerError } from './services/error-service.js';
import { getUserByUsername } from './services/users-service.js';
import { login, register } from './services/auth-service.js';

export const app = Fastify({
     logger: Boolean(process.env.DEVELOPMENT) 
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

app.post('/login', async (request, reply) => {
    try {
        const {username, password} = request.body;
        const user = await getUserByUsername(username);
        if(!user) return reply.code(403).send('Invalid credentials');
        const userLogin = await login(username, password);
        if(!login) return reply.code(403).send('Invalid credentials');
        delete userLogin.password;
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
        delete newUser.password;
        reply.code(201).send(newUser);
    } catch (error) {
        registerError('Error registering user', error);
        reply.code(500).send('Error registering user');
    }
});