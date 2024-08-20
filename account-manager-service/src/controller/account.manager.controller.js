const accountService = require('../service/account.manager.service');
const AccountRequest = require('../model/account.request.model');

async function accountController(fastify) {
    // Register Route
    fastify.post('/register', async (request, reply) => {
        const {username, email, password} = request.body;
        const accountRequest = new AccountRequest(username, email, password);
        try {
            const accountResponse = await accountService.registerUser(accountRequest);
            console.log(accountResponse);
            reply.send(accountResponse);
        } catch (error) {
            reply.status(500).send({error: 'Error registering user'});
        }
    });

    // Login Route
    fastify.post('/login', async (request, reply) => {
        const { username, password } = request.body;
        const accountResponse = await accountService.authenticateUser(username, password);
        console.log(accountResponse);
        if (!accountResponse) {
            return reply.status(401).send({ error: 'Invalid credentials' });
        }

        const token = fastify.jwt.sign({ id: accountResponse.id });
        reply.send({ token, account: accountResponse });
    });

    // Get Accounts Route
    fastify.get('/accounts', async (request, reply) => {
        try {
            const user = await fastify.jwt.verify(request.headers.authorization);
            const accounts = await accountService.getAccounts(user["id"]);
            reply.send(accounts);
        } catch (error) {
            reply.status(500).send({ error: 'Error fetching accounts' });
        }
    });
}

module.exports = accountController;