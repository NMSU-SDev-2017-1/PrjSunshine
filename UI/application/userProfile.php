<!--Begin user profile loading via php-->
<?php
//CHANGE ME
$userName = 'Zachary Toups';
$userProfile["userStatistic"]["statisticBool"] = false;
//CHANGE ME
//Grab user profile setting via written file
if($userName == 'none'){
	$userName = "Hello!";
}else{
	$userName = "Hello, ".$userName."!";
}

if($userProfile["userStatistic"]["statisticBool"] == false){
	$statString = "<p>When you begin using project sunshine, you can keep track of some of your photo statistics here</p>";
	$statString .= "<p>You can get started on creating your profile by selecting the edit button under the default photo.</p>";
}else{
	
	$numberPhotos = $userProfile['userStatistic']['numberPhotos'];
	$numberOfSunrise = $userProfile['userStatistic']['numberOfSunrise'];
	$numberOfSunset = $userProfile['userStatistic']['numberOfSunset'];
	$averagePhoto = $userProfile['userStatistic']['averagePhoto'];
	$averageNumberOfLikes = $userProfile['userStatistic']['averageNumberOfLikes'];
	$mostPopularPhoto = $userProfile['userStatistic']['mostPopularPhoto'];
	
	//User profile is set, grab values
	$statString ="
	<ul>
		<li>Number of photos taken: $numberPhotos</li>
		<li>Number of Sunrise photos: $numberOfSunrise</li>
		<li>Number of Sunset photos: $numberOfSunset</li>
		<li>Average time of day for each photo: $averagePhoto</li>
		<li>Average number of Instagram likes: $averageNumberOfLikes</li>
		<li>Most popular photo: $mostPopularPhoto</li>
	</ul>";
}
?>
<div class="container">
	<!--User profile-->
	<div class="col-md-3">
		<img class="image2" src="properties\images\profilePicture.jpg" align="middle">
	</div><!--End picture div-->
	<!--User statistics/hello-->
	<div class="col-md-3">
		<h3><?php  echo $userName; ?></h3>
		<p>Project Sunshine Statistics</p>
		<?php  echo $statString?>
	</div>
</div>