const mongoose = require('mongoose');

exports.conect = ()=>{
    mongoose.connect('mongodb://localhost/my_database',()=>{
        console.log('db connected');
    })
}

