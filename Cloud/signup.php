<?php 
session_start();

	include("connection.php");
	include("functions.php");


	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		//something was posted
		$user_name = $_POST['user_name'];
		$password = $_POST['password'];

		if(!empty($user_name) && !empty($password) && !is_numeric($user_name))
		{

			//save to database
			$user_id = random_num(20);
			$query = "insert into users (user_id,user_name,password) values ('$user_id','$user_name','$password')";

			mysqli_query($con, $query);

			header("Location: login.php");
			die;
		}else
		{
			echo "Please enter some valid information!";
		}
	}
?>


<!DOCTYPE html>
<html>
<head>
	<title>Signup</title>
	<link rel="stylesheet" href="login.css"/>
</head>
<body>
	<div id="bg">
	<div id="box">
		
		<form method="post">
			<div style="font-size: 20px;margin: 10px;color: #111111;"><h3>Signup</h3></div>

			<input id="text" type="text" name="FullName"placeholder="Enter your name "><br><br>
			<input id="text" type="text" name="user_name"placeholder="User name"><br><br>
			<input id="text" type="password" name="password"placeholder="Password"><br><br>

			<input id="button" type="submit" value="Signup"><br><br>

			<a href="login.php">Click to Login</a><br><br>
		</form>
	</div>
	</div>
</body>
</html>