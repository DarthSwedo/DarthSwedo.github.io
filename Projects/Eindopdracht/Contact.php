<?php
	if (isset($_POST["submit"])) {
		$name = $_POST["name"];
		$email = $_POST["email"];
		$phone = $_POST["phone"];
		$message = $_POST["message"];

		if (!empty($name) && !empty($email) && !empty($phone) && !empty($message)) {
		echo "<script> alert ('Jouw bericht is verzonden! We geven zo snel mogelijk antwoord');</script>";
		}
	
		else{
		echo "<script> alert ('Gelieve alle waarden in te vullen aub!');</script>";
		}
	}
?>

<!DOCTYPE HTML>
<html>
<head>
	<title>Amsterdam</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width" />
	<link href="css/stylesheet.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="css/mobile.css" type="text/css" media="screen"/>
	<link rel="stylesheet" href="css/print.css" type="text/css" media="print"/>
</head>
<body>

<main>

	<header>

		<img src="images/Logo.jpg" name="logo" width="300" height="70" id="logo" />
		<img src="images/skyline.jpg" name="skyline" id="skyline" />
		<nav>
			<ul class="menu">
				<li><a href="index.html">Home</a></li>
				<li><a href="About.html">About</a></li>
				<li><a href="Tourism.html">Tourism</a></li>
				<li><a href="Culture.html">Culture</a></li>
				<li><a href="Photos.html">Photos</a></li>
				<li><a href="Contact.php" class="active">Contact</a></li>
				<li><a href="Project.html">Project</a></li>
			</ul>
		</nav>
	</header>

	<article>
		<section id="Afbeelding">
			<!--<img src="images/amsterdam.jpg" alt="amsterdam">-->	
		</section>

		<section class="Contactheader">
			<h1>Contact</h1>
			<p>Do you have questions about Amsterdam? Or just want to give feedback? Please contact us!</p>
		</section>
		<section class="Map">
			<img src="images/Contact/Amsterdam-Map.jpg" height="300px" width="480px"  />

		</section>

		<section class="Form">
			<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
				<label for="name" class="name">Name: <br></label>
                <input type="text" name="name" id="name" value=""><br>

				<label for ="email">Email: <br></label>
                <input type="email" name="email" id="email" value=""><br>

				<label for="Phone number">Phone number: <br></label>
				<input type="text" name="phone" id="phone" value=""><br>

				<label for="message">Message: <br> </label>
				<textarea name="message" rows="7" cols="30"></textarea><br>

				<div class="button">
					<input type="submit" name="submit" value="">
				</div>
				</form>
		</section>



	</article>

	<footer>

		<div class="find">
			<h3>Find us on:</h3>
			<img src="images/footer/facelogo.gif" height="50px" width="50px"/>
			<img src="images/footer/twitter.png" height="50px" width="50px"/>
		</div>
		<div class="Contactus">
			<h3>Contact us</h3>
			<p>Visit our contact page or send an email to info@amsterdam.com</p>
		</div>
		<div class="copyright">
			<p>Copyright © 2014 Laurent Van Wambeke All rights reserved</p>
		</div>
	</footer>


</main>
</body>
</html>