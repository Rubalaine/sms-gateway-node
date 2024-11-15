import 'dotenv/config.js';
import  Knex  from 'knex';

export const qb = Knex({
    client: process.env.DATABASE_CLIENT,
    debug: Boolean(process.env.DEVELOPMENT * 1),
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        port: process.env.DATABASE_PORT *1,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
});