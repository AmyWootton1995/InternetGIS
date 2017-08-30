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
		
	$query3 = "UPDATEincident SET type = 'Environmental Incident' WHERE id = (SELECT maxID from incident)";
	
	
		?>