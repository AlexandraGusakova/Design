const random = require("./random")

const lastNames = ["Гусакова", "Панасик", "Жуков", "Старовойтов", "Сулик"]
const formLetters = "АБВГДЕ"

class Grades
{
	constructor(ДЭиВИ, МАМИ, КМС, Криптография, PHP)
	{
		this.ДЭиВИ = ДЭиВИ
		this.МАМИ = МАМИ
		this.КМС = КМС
		this.Криптография = Криптография
		this.PHP = PHP
	}
}

class Student
{
	constructor(last_name, form, grades)
	{
		this.last_name = last_name
		this.form = form
		this.grades = grades
	}
}

const randomForm = () => `${random.randomInt(1, 11)}${formLetters[random.randomInt(0, formLetters.length - 1)]}`

const randomGrades = () => new Grades(...Array.from(Array(10).keys(), () => random.randomInt(1, 10)))

function averageValue(object)
{
	let keys = Object.keys(object)
	return keys.reduce((s, i) => s + object[i], 0) / keys.length
}

module.exports.randomStudent = () => new Student(lastNames[random.randomInt(0, lastNames.length - 1)], randomForm(), randomGrades())

module.exports.averageGrade = student => averageValue(student.grades)
