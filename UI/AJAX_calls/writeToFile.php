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

	//Get current date for photo
	$monthDayYear = date("m/d/y");

	//Write final time to file
	$fileString = "<set>1</set>\n";
	$fileString .=  "<date>".$monthDayYear."</date>\n";
	$fileString .= "<time>".$userHour.$userMinute."</time>\n";
	$fileString .= "<pictureNumber>1</pictureNumber>\n";
	$fileString .= "<interval>5</interval>\n";
	$fileString .= "<delay>".$finalTime."</delay>\n";
 	
 	$fileName = $dir . 'commands.sun';
 	
 	$fileBoolean = file_put_contents ($fileName, $fileString);
 	$success = true;
 	if($fileBoolean == true){
 		$results['SUCCESS'] = 'Request has been successfully processed';
 	}else{
 		$success = false;
 		$results['ERROR'] = 'Writting to file has failed, please try again.';
 	}
	
	if($success == true){
		echo json_encode($results['SUCCESS']);
	}else{
		echo json_encode($results['ERROR']);
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
