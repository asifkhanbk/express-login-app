const userService = require('./users.service')

exports.signup = async (req, res, next) =>{
    try{
        const response = await userService.signup(req.body)
        res.send(response)
        next()
    } catch (error) {
        res.send(error)
    }
}

exports.getAllUsers = async (req,res,next) =>{
    try{
        const response = await userService.getAllUsers()
        res.status(200).send(response)
        next()
    } catch (error){
        res.send(error)
    }
}

exports.login = async (req,res,next) =>{
    try{
        const response = await userService.login(req.body)        
        res.status(200).send(response)
        next()
    } catch (error){
        res.status(400).send(error)
    }
}

exports.getMe = async (req, res, next) =>{
    try{
        
        const authHeader = req.headers.authorization
        if (authHeader && authHeader.startsWith('Bearer ')){
            const token = authHeader.split(' ')[1]
            const response = await userService.getMe(token)
            res.send(response)
        } else {
            res.send("Unable to find token")
        }
        
    } catch (error){
        res.send(error)
    }
}
