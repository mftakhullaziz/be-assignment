const fastify = require('./controller/account.manager.controller');

fastify.listen({ port: 3000 }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Account Manager Service running on http://localhost:3000');
});
