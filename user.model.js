const bcrypt = require('bcrypt');

class User {
    constructor(id, username, email, password){
        if (!username || !email || !password){
            throw new Error('Name, Email & Password are required')
        }

        this.id = id
        this.username = username
        this.email = email
        this.hashedPassword = null

        if (password){
            this.setPassword(password)
        }
    }

    async setPassword(password){
        const saltRounds = 10
        this.hashedPassword = await bcrypt.hash(password,saltRounds)
    }

    async validatePassword(password){
        return await bcrypt.compare(password, this.hashedPassword)
    }
}

module.exports = User