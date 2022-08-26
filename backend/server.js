const express = require('express')
const app = express()


// middleware
app.use(express.json())


app.listen(8000)