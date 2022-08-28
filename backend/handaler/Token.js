const jwt = require('jsonwebtoken');

exports.jwtToken = (payload,expierdIn) =>(
    jwt.sign(payload,process.env.SECRET_TOKEN, { expiresIn : expierdIn})
);