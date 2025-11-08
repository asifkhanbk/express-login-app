const bcrypt = require('bcrypt');
const { json } = require('express');
const saltRounds = 10
const jwtUtil = require('./jwt.utils')


const users = [
    {"username":"Admin", "password": "password"}
]

async function signup (userData) {
    if (users.some(user => user.username === userData.username)) return res.status(404).send(`User with username ${userData.username} already exists`);

    try{
            const hashedPassword = await bcrypt.hash(userData.password,saltRounds)
            users.push({username: userData.username , password: hashedPassword})
            return `${userData.username} created`
        }catch (error){
            return error
        };
    }
    
async function getAllUsers(){
    try {
        return users
    }
    catch (error){
        return error
    }
}

async function login(userLoginData) {
    const user = users.find(user => user.username === userLoginData.username)
    if (!user) return(`${userLoginData.username} not found`);

    try{
        const isMatch = await bcrypt.compare(userLoginData.password , user.password)
        if (isMatch){
            const jwt = jwtUtil.generateToken(user)
            return(jwt)
        }else{
            return(`Password error`)
        }
    }catch (error){
        return error
    }

}

async function getMe(token) {
    try{
        return await jwtUtil.getUser(token)
    } catch (error){
        return error
    }
    
}


module.exports = {
    signup,
    getAllUsers,
    login,
    getMe
}

