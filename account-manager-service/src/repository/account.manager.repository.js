const prisma = require('../model/account.model');

class AccountRepository {
    async createUser(data) {
        return prisma.user.create({ data });
    }

    async findUserByUsername(username) {
        return prisma.user.findUnique({ where: { username } });
    }

    async findUserByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }

    async createAccount(data) {
        return prisma.paymentAccount.create({ data });
    }

    async findAccountsByUserId(userId) {
        return prisma.paymentAccount.findMany({ where: { userId } });
    }
}

module.exports = new AccountRepository();
