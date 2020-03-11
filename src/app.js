const express = require('express')
const cors = require ('cors')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const user = require('./routes/userRouter')

const dataBase = require("./model/database")
dataBase.connect()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/', index)
app.use('/user', user)

module.exports = app