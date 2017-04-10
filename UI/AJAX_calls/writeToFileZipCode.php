<?php  
$zipCode = $_POST['zipCode'];

//Get zip code values from saved file
$zipCodeInfo = json_decode(file_get_contents("sunShineData.json"), true);

//Get lat and lng specific to posted zip code through associative php array
//Note: Do not remove double quotes from zipCode, this allows us to use the associative array without php throwing errors
$zipCodeValues = $zipCodeInfo["$zipCode"];

if(isset($zipCodeInfo["$zipCode"]) == true){
	echo json_encode($zipCodeValues);
}else{
	echo json_encode('NULL');
}
?>