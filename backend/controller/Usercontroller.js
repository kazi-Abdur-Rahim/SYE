const Users = require('../models/UserModel')
const { varifyEmail , validateLength, validateUsername }  = require('../handaler/Varification')
const {sendEmailvarification} = require('../handaler/Mail')
const { jwtToken } = require('../handaler/Token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
 

exports.newuser = async (req,res)=>{
    try{
        const { 
            fName,
            lName,
            username,
            email,
            password,
            date,
            gender,
            verified
         } = req.body;

        if(!varifyEmail(email)) {
            return res.status(400).json({
                message : "Invalid Email Address"
            });
        }

        const chekEmail = await Users.findOne({email})

        if(chekEmail) {
            return res.status(400).json({
                message : "Email already been exist"
            })
        }

        if(!validateLength(fName,3,15)){
            return res.status(400).json({
                message : "Firstname should be minimum 3 and max 15 characters"
            })
        }

        if(!validateLength(lName,3,15)){
            return res.status(400).json({
                message : "lastname should be minimum 3 and max 15 characters"
            })
        }

        if(!validateLength(password,8,40)){
            return res.status(400).json({
                message : "Password should be minimum 8 characters"
            })
        }

        // bcrypt-Password
        const encrypt = await bcrypt.hash(password, 10)

        // generate username
        let tempUsername = fName + lName
        let finalUsername = await validateUsername(tempUsername)

         const User = await new Users({ 
            fName,
            lName,
            username: finalUsername,
            email,
            password: encrypt,
            date,
            gender,
            verified
          }).save()

          const emailToken = jwtToken({ id: User._id.toString()},'1h')

          const url = `${process.env.BASE_URL}/activate/${emailToken}`

          sendEmailvarification(User.email,User.fName,url)

          const token = jwtToken({ id: User._id.toString()},'7d')
          
          res.send({
            id: User._id,
            username: User.username,
            email: User.email,
            fName: User.fName,
            lName: User.lName,
            verified: User.verified,
            token: token,
            message: "Register success! Please activate your email before"
          })
        
    }
    catch(err){
        console.log(err.message);
    }

}

exports.emailVarified = async (req,res)=>{
    const {token} = req.body
    const user = jwt.verify(token, process.env.SECRET_TOKEN)
    const check = await Users.findById(user.id)
    if(check.verified === true) {
        return res.status(400).json({
            message: "this email is already verified"
        })
    }
    else{
        await Users.findByIdAndUpdate(user.id,{verified: true});
        return res.status(200).json({
            message: "account has been activated successfully"
        })
       
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await Users.findOne({email})
        console.log(user);
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                const token = jwtToken({ id: user._id.toString()},'7d')
                res.send({
                  id: user._id,
                  username: user.username,
                  email: user.email,
                  fName: user.fName,
                  lName: user.lName,
                  verified: user.verified,
                  token: token,
                  message: "login success!"
                })
            }
            else{
                res.status(404).json({
                    message: "Password Incorrrect"
                })
            }
        }else{
            res.status(404).json({
                message: "Invalid Email"
            })
        }
    }
    catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}