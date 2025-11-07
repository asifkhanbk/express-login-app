const express = require('express')
const jwt = require('jsonwebtoken')
const port = 3000

const userRoutes = require('./users.routes')

app = express()
app.use(express.json())

app.use('/users',userRoutes)

app.listen(port,()=>{
    console.log(`App is running in ${port}`)
})