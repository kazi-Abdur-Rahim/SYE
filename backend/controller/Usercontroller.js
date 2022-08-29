const Users = require('../models/UserModel')
const { varifyEmail , validateLength, validateUsername }  = require('../handaler/Varification')
const {sendEmailvarification} = require('../handaler/Mail')
const { jwtToken } = require('../handaler/Token');
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
