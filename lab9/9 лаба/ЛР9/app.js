const PORT = 3000
const HOST = "localhost"

const express = require("express")
const http = require("http")

const app = express()
const server = http.createServer(app);

const redis = require("redis")
const client = redis.createClient()
console.log("Подключение к Redis...")

const io = require("socket.io")

if (!module.parent)
{
    server.listen(PORT, HOST)
    const socket = io.listen(server)

    socket.on("connection", client => {
        const subscribe = redis.createClient()
        subscribe.subscribe("bstu_news")

        subscribe.on("message", (channel, message) => {
            client.send(message)
			console.log(`Получено сообщение с канала ${channel}: ${message}`)
        })

        client.on("message", message => {
            console.log(message)
        })

        client.on("disconnect", () => {
            console.log("Отключение от Redis...")
            subscribe.quit()
        })
    })
}
