const Users = require('../models/UserModel')


const newuser = async (req,res)=>{
    try{
        const { 
            fName,
            lName,
            email,
            password,
            date,
            gender,
            verified
         } = req.body
    
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

module.exports = newuser