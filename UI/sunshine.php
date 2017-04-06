<?php
	require_once('project_sunshine_web_app/properties/template/navigation_menu.php');
?>
<!--Link our ProjectSunshine custom css-->
<link rel="stylesheet" href="project_sunshine_web_app/properties/template/custom.css">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<!--Link specific JavaScript-->
<script src="sunshine.js?<?php echo time(); ?>" type="text/javascript"></script>
<!--Page specific content begins here-->
<!DOCTYPE html>
<html lang="en">
<style> 
#borderimg1 { 
    border: 10px solid transparent;
    padding: 15px;
    border-image: url(border.png) 30 round;
}
</style>
<div class="container-fluid">

	<!--If JavaScript process fails, warning messages are appended here-->

	<div class="col-md-12 fluid" id="fatalErrorWarning">
		<div class="alert" style="display:none">
	  		<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
		</div>
	</div>

	<!--Tutorial for new users-->
	
	<div class="col-md-12 fluid">
		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="panel-title text-left">Help</div>
			</div>
			<div class="panel-body">
				<label><b><i>Getting Started</i></b></label>
				<ul>
					<li>Begin by selected hour, minute and AM/PM options for the photo.</li>
				</ul>
			</div><!--End panel body-->
		</div><!--End panel-->
	</div>
	<!--End Tutorial-->
	<!--users profile set up-->
	<div class="col-md-12 fluid">
		<div class="panel">
			<div class="panel-body">
				<label><b><i>User Name</i></b></label>
					<div>
						<img src="project_sunshine_web_app\properties\images\headerSunRaise.jpg" alt="profile" class="pull-left" style=" width:150px; height:120px; border-radius: 100% ">
					</div>
				
			</div><!--End panel body-->
		</div><!--End panel-->
	</div>
	<div class="col-md-12 fluid">
		<div class="panel">
			<div class="panel-body">
					<div>
						<button id="usernameprofile" style="width:304px;height:50px;" class="btn btn-primary form-control pull-left">Edit</button>
					</div>
				
			</div><!--End panel body-->
		</div><!--End panel-->
	</div>

	<!--End userProfile setup-->

	<!--Begin photo options-->
	<div class="col-md-12">
		<div class="panel panel-gettingStarted">
			<div class="panel-heading">
				<div class="panel-title text-left">Photo Options</div>
			</div>
			<div class="panel-body">
				<!-- Hour -->
				<div class="col-md-4">
					<label>Hour: </label>
					<select class="form-control" id="hour">
						<option value='none'>Select Hour</option>
						<?php  
							for ($i=1; $i < 13; $i++) { 
								$optionStringHour = '<option value="';
								$optionStringHour .= $i.'">'.$i.'</option>';
								echo $optionStringHour;
							}
						?>
					</select>
				</div>
				<!-- Minutes -->
				<div class="col-md-4">
					<label>Mintue: </label>
					<select class="form-control" id="minute">
						<option value='none'>Select Minute</option>
						<?php  
							for ($j=0; $j < 61; $j++) { 
								$optionStringMinute = '<option value="';
								$optionStringMinute .= $j.'">'.$j.'</option>';
								echo $optionStringMinute;
							}
						?>
					</select>
				</div>
				<div class="col-md-4">
					<label>AM/PM: </label>
					<select class="form-control" id="12Hour">
						<option value='none'>Select time of day</option>
						<option value="am">AM</option>
						<option value="pm">PM</option>
	  				</select>
	  				<br>
				</div>
				<div class ="col-md-10">
				</div>
				<div class="col-md-2">
					<button id="submitTimePhoto" class="btn btn-primary form-control pull-right">Submit</button>
				</div>
				<!--type-->
				<div class="col-md-4">
					<label>camera: </label>
					<select class="form-control" id="camera">
						<option value='none'>select camera</option>
						<option value="am">intergrated</option>
						<option value="pm">SLR</option>
	  				</select>
	  				<br>
				</div>
			</div><!--End panel body-->
		</div><!--End panel-->
	</div>
	<!--End photo options-->

	<!--Photo container-->
	<!--By default div is hidden unless user has images within images directory-->
	<div class="col-md-12" style="display:none">
		<div class="panel panel-success">
			<div class="panel-heading">
				<div class="panel-title text-left">My Photos</div>
			</div>
			<div class="panel-body">
				<?php  
					require_once('project_sunshine_web_app/properties/slideshow.php');
				?>
			</div><!--End panel body-->
		</div><!--End panel-->
	</div>
	<!--End photo container-->
</div>
<!--End page content-->