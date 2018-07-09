const http = require("http")
const ip = require("./ip")
const redis = require("redis")


let redisClient = redis.createClient()

redisClient.on("connect", () => {
	const host = "127.0.0.1"
	const port = 1300

	const server = http.createServer((request, response) => {
		response.statusCode = 200
		response.setHeader("Content-Type", "text/html")
		response.write("<meta charset='utf8'>")

		let clientIp = ip.getClientIp(request)
		if (request.url !== "/favicon.ico")
		{
			redisClient.setnx(clientIp, 0)
			redisClient.incr(clientIp)
			redisClient.get(clientIp, (error, reply) => {
				if (error)
					response.write(`<h1>Ошибка :(</h1>`, () => response.end())
				else
				{
					console.log(`IP: ${clientIp}, ${reply}`)
					response.write(`${reply}-й раз`, () => response.end())
				}
            }
                           )
		}
		else
		{
			response.end()
		}
	})

	server.listen(port, host, () => {
		console.log(`Сервер запущен: http://${host}:${port}/`)
	})
})
