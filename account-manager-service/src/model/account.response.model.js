class AccountResponse {
    constructor(id, username, email, createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
    }
}

module.exports = AccountResponse;
