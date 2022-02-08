const express = require('express');
const cors = require('cors');
const router = require('./routes/index.routes')
const errorHandler = require('./middleware/error.handler.mw')

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

module.exports = app