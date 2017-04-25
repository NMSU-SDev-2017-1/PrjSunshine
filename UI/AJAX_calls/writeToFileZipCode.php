<?php  
$zipCode = $_POST['zipCode'];
$jsonFileName = "sunshineData.json";
if(is_readable($jsonFileName) == true){
	//Get zip code values from saved file
	$zipCodeInfo = json_decode(file_get_contents($jsonFileName), true);

	if(isset($zipCodeInfo["{$zipCode}"]) == true){
		error_log(print_r($zipCodeInfo["{$zipCode}"],true));
		$zipInfo = $zipCodeInfo["{$zipCode}"];
		echo json_encode('Sun will raise at 6:56 AM');
	}else{
		echo json_encode('NULL');
	}
}
//Throw fatal error, cannot read file
else{
	echo json_encode('Cannot read file sunShineData.json');
}
?>