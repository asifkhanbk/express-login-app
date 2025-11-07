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
            {username:user.usenamer}, REFRESH_TOKEN_SECRET, {expiresIn:'2d'}

        )

        return {accessToken,refreshToken}
    }
    catch (error){
        return `Unable to obtain Access and Refresh Keys`
    }
}


module.exports = {
    generateToken
}