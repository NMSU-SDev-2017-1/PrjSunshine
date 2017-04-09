<?php  
$zipCode = (string) $_POST['zipCode'];

//Get zip code values from saved file
$zipCodeInfo = json_decode(file_get_contents("sunShineData.json"), true);

//Get lat and lng specific to posted zip code through associative php array
$zipCodeValues = $zipCodeInfo[$zipCode];
error_log(print_r($zipCodeValues,true));
/*$lat = 
$lng = */

echo json_encode('foo foo');
?>