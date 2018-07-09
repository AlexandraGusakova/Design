const http = require("http")
const redis = require("redis")
const random = require("./random")



const HOST = "127.0.0.1"
const PORT = 3000

const randomString = () => (Math.random() + 1).toString(36).substr(2, 5)

let redisClient = redis.createClient()
redisClient.select(9)

redisClient.on("connect", () => {

	const server = http.createServer((request, response) => {
		if (request.url === "/favicon.ico")
		{
			response.writeHead(200, {"Content-Type": "image/x-icon"})
			response.end()
			return
		}
		for (let i = 0; i < 10; i++)
		{
			let id = random.randomInt(1, 10000)
			let name = "Игрок "+i*random.randomInt(10, 500)
			let score = random.randomInt(100, 5000)
			let date = new Date()
			let time = date.getTime()

			redisClient.hset(id, "name", name, redis.print)
			redisClient.hset(id, "score", score, redis.print)
			redisClient.hset(id, "date", date.toLocaleString(), redis.print)

			redisClient.zadd("leaders", time, id)
		}
		response.end()
		return
	})

	server.listen(PORT, HOST, () => {
		console.log(`Сервер запущен: http://${HOST}:${PORT}/`)
	})
})
