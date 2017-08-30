<?php 

	session_start();
	$host        = "host=41.185.27.219";
	$port        = "port=5432";
	$dbname      = "dbname=devgroup3";
	$credentials = "user=devgroup3 password=YdNEqwH6mbFPQ9KZ";
	$db = pg_connect("$host $port $dbname $credentials");
	if($db){
		echo 'connected';
	}
		
	$varstatus = pg_escape_string($_POST['stat']);
	$varstatID = pg_escape_string($_POST['statID']);

	$query5 = "UPDATE public.incident SET status = '$varstatus' WHERE id = '$varstatID'";
	$result = pg_query($query5);
	print $query5;
	
		
		
		/*
		if (!$result) {
  		$errormessage = pg_last_error();
		echo $query1;
		exit();
		}
		
		printf ("These values were inserted into the database - %s %s %s" $varlat, $varlng);
		pg_close();*/

		header("Location: TestMap.html");
		exit;
	
		?>