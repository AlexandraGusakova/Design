const http = require("http")
const fs = require("fs")
const pug = require("pug")

const compiled = pug.compileFile(`${__dirname}/main.pug`)

const HOST = "127.0.0.1"
const PORT = 3001

const server = http.createServer((request, response) => {
	response.end(compiled())
})

server.listen(PORT, HOST, () => {
	console.log(`Сервер запущен: http://${HOST}:${PORT}/`)
})
