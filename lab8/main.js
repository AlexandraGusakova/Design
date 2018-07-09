const http = require("http")
const redis = require("redis")
const jade = require("jade")

const layout = require("fs").readFileSync(`${__dirname}/scores.jade`, "utf8")
const fn = jade.compile(layout, {filename: `${__dirname}/scores.jade`})

const HOST = "127.0.0.1"
const PORT = 3000

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
		let players = []
        
		redisClient.zrevrange("leaders", 0, 9, (error, result) => {
            redisClient.sort("score")
			for (let id of result)
			{
				redisClient.hgetall(id, (e, object) => {
					players.push(object)
					if (players.length === 10)
						response.end(fn({scores: players}))
				})
			}
            
		})
	})

	server.listen(PORT, HOST, () => {
		console.log(`Сервер запущен: http://${HOST}:${PORT}/`)
	})
})
