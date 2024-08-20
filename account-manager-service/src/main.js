const fastify = require('fastify')({ logger: true });
const accountController = require('./controller/account.manager.controller');

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

start().then(r => console.log(r));
