const express = require('express');
const route = express.Router()

const AuthController = require("../controller/authController")

route.post('/register',AuthController.register)
route.post('/login',AuthController.login )
route.post('/refresh-token',AuthController.refreshToken )
console.log('hello')
module.exports= route 