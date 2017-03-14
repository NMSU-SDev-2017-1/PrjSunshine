<?php
	//Get posted values from AJAX call
	$userHour = $_POST['hour'];
	$userMinute = $_POST['minute'];
	$userTimeOfDay = $_POST['timeOfDay'];

	//Getting current time from server, pass time into file for Java program

	//Time is returned as Hour:minute:secondpm/am
	$currentTime = date("h:i:sa");
	
	//Parse date via seperation of elements by semicolon
	$date = explode(":", $currentTime);
	
	//Convert both current system time and time entered by user
	$time = convertTimeToSeconds($date[0], $date[1], substr($date[2], 2, 4));
	$userTime = convertTimeToSeconds($userHour, $userMinute, $userTimeOfDay); 	

	if($time > $userTime){
		$finalTime = $time - $userTime; 
	}else{
		$finalTime = $userTime - $time;
	}

	//Write final time to file
	$fileString = "SET= 1\n";
	$fileString .=  "DATE= 3 Mar 2017\n";
	$fileString .= "TIME= 0550\n";
	$fileString .= "PICNUM= 1\n";
	$fileString .= "INTERVAL= 5\n";
	$fileString .= "DELAY= ".$finalTime."\n";

	file_put_contents("../../RPI Box/ProjectSunshine/Input/commands.sun", "");
	if(file_put_contents("../../RPI Box/ProjectSunshine/Input/commands.sun", $fileString)){
		echo json_encode('Success!');
	}
	

	//Purpose: Convert time a given time to seconds
	function convertTimeToSeconds($hour,$minute, $timeOfDay){
		$finalTime = 0;

		//Convert hour
		$finalTime += $hour*60*60;
		$finalTime += $minute*60;

		if($timeOfDay == 'pm'){
			$finalTime += 12*60*60;
		}

		return $finalTime;
	}
?>