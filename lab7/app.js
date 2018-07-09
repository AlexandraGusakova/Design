const http = require("http")
const fs = require("fs")

const school = require("./school")

let students = []
for (let i = 0; i < 4; i++)
	students.push(school.randomStudent())

fs.writeFileSync("students.json", JSON.stringify(students, null, " "))

const host = "127.0.0.1"
const port = 3000

const server = http.createServer((request, response) => {
	response.statusCode = 200
	response.setHeader("Content-Type", "text/html")
	response.write("<meta charset='utf8'>")
	response.write("<style>body{color:#60606e;font-family: 'Open sans', sans-serif;font-size: 18px;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;overflow-x: hidden;} div{text-align: left;}</style>")

	students = JSON.parse(fs.readFileSync("students.json"))

	response.write("<div>")
	response.write("<h1>Студенты</h1>")

	for (let student of students)
	{
		response.write("<hr>")
		response.write("<div class='box'>")
		response.write(`<b>Фамилия:</b> ${student.last_name}<br>`)
		response.write(`<b>Оценки:</b>`)
		response.write("<div class='box'>")
		for (let i in student.grades)
			response.write(`${i}: ${student.grades[i]}<br>`)
		response.write("</div>")
		response.write(`<b>Средний балл:</b> ${school.averageGrade(student).toFixed(2)}`)
		response.write("</div>")
	}

	response.write("</div>")

	response.end()
})

server.listen(port, host, () => {
	console.log(`Сервер запущен: http://${host}:${port}/`)
})
