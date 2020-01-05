const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { dbURI, port } = require('./config/environment')
const logger = require('./lib/logger')
const router = require('./config/router')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Mongo connected'))

app.use(logger)

app.use('/api', router)

app.listen(port, () => console.log(`Up and running on port ${port}`))

module.exports = app