import Fastify from 'fastify';
import { getAllPatients } from './services/patient-service';

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