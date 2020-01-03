const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { dbURI, port } = require('./config/environment')
const router = require('./config/router')
// const bodyParser = require('body-parser')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Mongo connected'))

app.use('/api', router)

app.listen(port, () => console.log(`Up and running on port ${port}`))

module.exports = app