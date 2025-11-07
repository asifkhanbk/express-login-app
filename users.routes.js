const express = require('express')
const router = express.Router()
const userController = require('./users.controller')


const bcrypt = require('bcrypt')
const saltRounds = 10
const authenticationMiddleware = require('./authentication.middleware')

router.get('/',(req,res) => {
    return res.send("Hello World")
})


router.post('/signup',userController.signup)

router.get('/users',authenticationMiddleware.authenticateToken , userController.getAllUsers)

router.post('/login', userController.login)

module.exports = router