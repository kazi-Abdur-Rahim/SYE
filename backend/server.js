const express = require('express')
const { connect } = require('./database/dbConfig')
require('dotenv').config();

// Database-connection
connect()

// middleware
const app = express()
app.use(express.json())

//all-work





const Port = process.env.PORT || 8000;
app.listen(Port)