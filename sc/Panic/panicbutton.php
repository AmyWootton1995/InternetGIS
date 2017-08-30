<?php 
session_start();
	
	$headers = "From: SafetyCircle \r\n"; 
	$headers .= "Reply-To: safetycircle@gmail.com \r\n"; 
	$headers .= "MIME-Version: 1.0 \r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1 \r\n";
	$message = '<html><body><h1>The Panic Button has been pushed </h1><p>Follow this link to find the responder </p><link>http://41.185.27.219/sc/Map/latest2/TestMap.html</link></body></html>';
	mail('luqmaanhassim1@gmail.com','HELP!',$message,$headers);
	
	$host        = "host=41.185.27.219";
	$port        = "port=5432";
	$dbname      = "dbname=devgroup3";
	$credentials = "user=devgroup3 password=YdneqwH6mbfpQ9KZ";
	$db = pg_connect("$host $port $dbname $credentials");
	if($db){
		echo 'connected';
	}
		
		$varlat = pg_escape_string($_POST['lng']);
		$varlng = pg_escape_string($_POST['lat']);
		$varaccu = pg_escape_string($_POST['accu']);
	
		
		$query1 = "INSERT INTO incident(accuracy, geom) VALUES ($varaccu, ST_MakePoint('POINT($varlat $varlng)', 4326))";
		
	
		?>