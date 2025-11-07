const userService = require('./users.service')

exports.signup = async (req, res, next) =>{
    try{
        const response = await userService.signup(req.body)
        res.status(201).send(response)
        next()
    } catch (error) {
        res.status(400).send(`Signup failed`)
    }
}

exports.getAllUsers = async (req,res,next) =>{
    try{
        const response = await userService.getAllUsers()
        res.status(200).send(response)
        next()
    } catch (error){
        res.status(404).send(`Unable to fetch users.`)
    }
}

exports.login = async (req,res,next) =>{
    try{
        const response = await userService.login(req.body)
        res.status(200).send(response)
        next()
    } catch (error){
        res.status(400).send('Login error')
    }
}
