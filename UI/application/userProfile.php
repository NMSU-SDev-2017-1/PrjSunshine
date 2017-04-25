<!--Begin user profile loading via php-->
<?php
//Get zip code values from saved file
$userProfileData = json_decode(file_get_contents("AJAX_calls/userProfile.json"), true);

if($userProfileData['fileStatus'] == 'default'){
	$tutorial = true;
}else{
	$tutorial = false;
}

if($tutorial == true){
	$userName = "Hello!";
	$photoPath = "properties\images\defaultProfilePicture.jpg";
	$statString = "<h2>Getting started</h2>";
	$statString .= "<p>When you begin using project sunshine, you can keep track of some of your photo statistics here.";
	$statString .= "You can get started on creating your profile by selecting the blue edit butto towards the top of the page.";
	$statString .= "</p>";
}else{
	//User has defined values for profile, do not show tutorial, display profile settings
	$userName = "Hello, ".$userProfileData['userName']."!";
	$photoPath = "AJAX_calls/".$userProfileData['fileStatus']; 
	$numberPhotos = $userProfileData['userStatistic']['numberPhotos'];
	$numberOfSunrise = $userProfileData['userStatistic']['numberOfSunrise'];
	$numberOfSunset = $userProfileData['userStatistic']['numberOfSunset'];
	$averagePhoto = $userProfileData['userStatistic']['averagePhoto'];
	$averageNumberOfLikes = $userProfileData['userStatistic']['averageNumberOfLikes'];
	$mostPopularPhoto = $userProfileData['userStatistic']['mostPopularPhoto'];
	
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
	<!--User options for a timed photo-->
	<div class="panel panel-gettingStarted">
		<div class="panel-heading">
			<div class="panel-title text-left"><?php  echo $userName; ?>
			<button class="btn btn-info btn-sm pull-right" data-toggle="modal" data-target="#myModal">Edit Profile</button>


			</div>
		</div>
	<div class="panel-body">
		<!--User profile-->
		<div class="col-md-3">
			<img class="image2" src="<?php echo $photoPath?>" align="middle">
		</div><!--End picture div-->
		<!--User statistics/hello-->
		<div class="col-md-9">
			<?php  echo $statString?>
		</div>
		<?php
			if($tutorial == false){
				require_once('userPhoto.php');
			}
		?>
	</div>
	</div>
</div>

<!--Modal to edit user profile info-->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Edit Profile information</h4>
      </div>
      <div class="modal-body">
      	<form action="AJAX_calls/processProfile.php" method="post" id="userEditProfile" enctype="multipart/form-data">
    	<label>First name:</label>
    	<input class="form-control" type="text" name="firstName">
    	<br>
    	<label>Last name:</label>
    	<input class="form-control" type="text" name="lastName">
    	<br>
    	<label>Profile picture:</label>
    	<input class="form-control" type="file" name="fileToUpload" id="fileToUpload">
      	<br>
      	</form>
      </div>
      <div class="modal-footer">
      	<button type="submit" form="userEditProfile" class="btn btn-info" id="submitProfileInfo">Submit</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
