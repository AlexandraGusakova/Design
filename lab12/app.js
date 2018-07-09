const PORT = 3000
const HOST = "127.0.0.1"

const express = require("express")
const http = require("http")
const lessMiddleware = require("less-middleware")

const app = express()

app.use(lessMiddleware(`${__dirname}/public`, {force: true}))
app.use(express.static(`${__dirname}/public`))

app.listen(PORT)
