<?php
	if (isset($_POST["username"]) && isset($_POST["password"]))
	{
		$users = json_decode(file_get_contents("users.json"), true);

		$users[$_POST["username"]] = $_POST["password"];

		file_put_contents("users.json", json_encode($users));
	}
?>
