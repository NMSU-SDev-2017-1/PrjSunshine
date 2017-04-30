<?php  
$fileJSON = json_decode(file_get_contents('userProfile.json'),true);
$fileJSON['userStatistic']['numberPhotos'] = $fileJSON['userStatistic']['numberPhotos'] + 1;   

if(isset($_POST['sunrise']) == true && $_POST['sunrise'] == 'sunrise'){
	$fileJSON['userStatistic']['numberOfSunrise'] = $fileJSON['userStatistic']['numberOfSunrise'] + 1; 
}
file_put_contents ('userProfile.json', json_encode($fileJSON));

echo json_encode('Successfully updated');

?>