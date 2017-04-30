<?php  
$fileJSON = json_decode(file_get_contents('userProfile.json'),true);
$fileJSON['numberPhotos'] = $fileJSON['numberPhotos'] + 1;   

if(isset($_POST['sunrise']) == true && $_POST['sunrise'] == 'sunrise'){
	$fileJSON['numberOfSunrise'] = $fileJSON['numberOfSunrise'] + 1; 
}
file_put_contents ('userProfile.json', json_encode($fileJSON));

echo json_encode('Successfully updated');

?>