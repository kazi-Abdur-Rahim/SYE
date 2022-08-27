const express = require("express")
const { newuser } = require('../controller/Usercontroller')    
const userRouter = express.Router()

userRouter.route('/signup').post(newuser);

module.exports = userRouter