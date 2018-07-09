const checkUser = users =>
{
	const username = $("#inputUsername").val()
	const password = $("#inputPassword").val()
	console.log(users)
	if (Object.keys(users).some(key => key === username))
		$("#result").text("Это имя пользователя уже занято")
	else
		$.post("register.php", {username: username, password: password}, () => $("#result").text("Вы успешно зарегистрированы!"))
}

const loadUsers = () =>
{
	$.getJSON("users.json", users => {
		checkUser(users)
	})
}

const main = () =>
{
	$("#sign-up").click(loadUsers)
}

$(document).ready(main)
