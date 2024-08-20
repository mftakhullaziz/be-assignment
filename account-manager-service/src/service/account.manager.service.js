const accountRepository = require('../repository/account.manager.repository');
const bcrypt = require('bcrypt');
const AccountResponse = require('../model/account.response.model');

class AccountService {
    async registerUser(accountRequest) {
        const hashedPassword = await bcrypt.hash(accountRequest.password, 10);
        const user = await accountRepository.createUser({
            username: accountRequest.username,
            email: accountRequest.email,
            password: hashedPassword,
        });

        return new AccountResponse(user.id, user.username, user.email, user.createdAt);
    }

    async authenticateUser(username, password) {
        const user = await accountRepository.findUserByUsername(username);
        if (!user) return null;

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return null;

        return new AccountResponse(user.id, user.username, user.email, user.createdAt);
    }

    async getAccounts(userId) {
        return accountRepository.findAccountsByUserId(userId);
    }
}

module.exports = new AccountService();
