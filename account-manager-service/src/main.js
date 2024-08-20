// require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const accountController = require('./controller/account.manager.controller');

// Register the @fastify/jwt plugin with a secret key
fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET_KEY
});

// Register routes
fastify.register(accountController);

// Run the server
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        fastify.log.info(`Server is running at http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();