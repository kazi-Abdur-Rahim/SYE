const Users = require('../models/UserModel')
const { varifyEmail }  = require('../handaler/Varification')
 

exports.newuser = async (req,res)=>{
    try{
        const { 
            fName,
            lName,
            email,
            password,
            date,
            gender,
            verified
         } = req.body;

         console.log(varifyEmail(email))

        if(!varifyEmail(email)) {
            return res.status(400).json({
                message: "Invalid Email Address"
            });
        }


         const User = await new Users({ 
            fName,
            lName,
            email,
            password,
            date,
            gender,
            verified
          }).save()
          res.json(User)
    }
    catch(err){
        console.log(err.message);
    }

}
