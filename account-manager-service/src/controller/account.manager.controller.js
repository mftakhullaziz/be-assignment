const accountService = require('../service/account.manager.service');
const AccountRequest = require('../model/account.request.model');
const fastify = require('fastify')();

fastify.post('/register', async (request, reply) => {
    const { username, email, password } = request.body;
    const accountRequest = new AccountRequest(username, email, password);
    try {
        const accountResponse = await accountService.registerUser(accountRequest);
        reply.send(accountResponse);
    } catch (error) {
        reply.status(500).send({ error: 'Error registering user' });
    }
});

module.exports = fastify;