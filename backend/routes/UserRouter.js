const express = require("express")
const { newuser } = require('../controller/Usercontroller')    
const { emailVarified  } = require('../controller/Usercontroller')    
const userRouter = express.Router()

userRouter.route('/signup').post(newuser);
userRouter.route('/activate').post(emailVarified);

module.exports = userRouter