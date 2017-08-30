<?php 

	session_start();
	$host        = "host=41.185.27.219";
	$port        = "port=5432";
	$dbname      = "dbname=devgroup3";
	$credentials = "user=devgroup3 password=YdneqwH6mbfpQ9KZ";
	$db = pg_connect("$host $port $dbname $credentials");
	if($db){
		echo 'connected';
	}
		
	$query2 = "UPDATE incident SET type = 'Criminal Activity' WHERE id = (SELECT maxID from incident)";
	
		
	
		?>