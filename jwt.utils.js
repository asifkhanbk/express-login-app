require('dotenv').config()
const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

async function generateToken(user){
    try{        
        const accessToken = jwt.sign(
            {username: user.username}, ACCESS_TOKEN_SECRET, { expiresIn: '20m'}
        )
        

        const refreshToken = jwt.sign(
            {username:user.username}, REFRESH_TOKEN_SECRET, {expiresIn:'2d'}

        )

        return {accessToken,refreshToken}
    }
    catch{
        return jwt.JsonWebTokenError
    }
}

async function getUser(token) {
    try{
        const payload = await jwt.verify(token, ACCESS_TOKEN_SECRET)
        const username = payload.username
        return `${username} signed in`
    } catch (error){
        return error
    }
}


module.exports = {
    generateToken,
    getUser
}