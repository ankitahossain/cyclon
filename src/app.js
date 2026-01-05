const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { globalErrorHandler } = require('./utils/globalErrorHandler')
const app = express()

/**
 * todo: middlewares
 */

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// routes

const apiVersion = process.env.BASE_URL
app.use(`/api/v1`, require("./routes/index"))



// error handling middleware

app.use(globalErrorHandler)

module.exports = app
