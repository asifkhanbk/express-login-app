const jwtUtil = require('./jwt.utils')
const User = require('./user.model')


const users = []
var idCounter = 1
async function signup (userData) {
    
    if (users.some(user => user.username === userData.username)) {
        return(`User with username ${userData.username} already exists`);
    }
        

    try{    
            const user = new User(id =idCounter,  username = userData.username, email = userData.email, password = userData.password)
            user.setPassword(password)
            users.push(user)
            idCounter++            
            return user
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
        const isMatch = await user.validatePassword(userLoginData.password)
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
        const username = await jwtUtil.getUser(token)
        const user = users.find(user => user.username == username)
        return user
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

