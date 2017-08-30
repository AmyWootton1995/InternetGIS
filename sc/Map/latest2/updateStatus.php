<?php 

	session_start();
	$host        = "host=41.185.27.219";
	$port        = "port=2288";
	$dbname      = "dbname=devgroup3";
	$credentials = "user=devgroup3 password=YdneqwH6mbfpQ9KZ";
	$db = pg_connect("$host $port $dbname $credentials");
	if($db){
		echo 'connected';
	}
		
	$varstatus = pg_escape_string($_POST['stat']);
	$varstatID = pg_escape_string($_POST['statID']);

	$query5 = "UPDATE incident SET status = 'stat' WHERE id = 'statID";
	
	
		?>