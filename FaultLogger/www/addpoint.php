<?php
	session_start();
	$host        = "host=41.185.93.18";
	$port        = "port=5432";
	$dbname      = "dbname=faultlogger";
	$credentials = "user=postgres password=geodev#3256";
	$db = pg_connect("$host $port $dbname $credentials");

	echo db;

	if($db){
	$varlat = pg_escape_string($_POST['latitude']);
	$varlng = pg_escape_string($_POST['longitude']);
	$ftype = pg_escape_string($_POST['faulttype']);
	$itype = pg_escape_string($_POST['typeelement']);
	$date = pg_escape_string($_POST['date']);
	$time = pg_escape_string($_POST['time']);
	$username = pg_escape_string($_POST['username']);
	$description = pg_escape_string($_POST['description']);
	$picture = pg_escape_string($_POST['picture'])


	$query1 = "INSERT INTO registered_items(ftype, date, time, username, description, picture, itype, geom) VALUES ('$ftype', '$date', '$time', '$username', '$description', '$picture', '$itype', ST_GeomFromText('POINT($varlng $varlat)', 4326))";

	$result = pg_query($query1);}
	echo $query1;
  if (!$result) {
  		$errormessage = pg_last_error();
		echo $errormessage;

      exit();
  }
  printf ("This point was inserted into the database");
  pg_close();
	header("Location: index.html");
	exit;
?>
