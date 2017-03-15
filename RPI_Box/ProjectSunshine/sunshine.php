<?php
	require_once('project_sunshine_web_app/properties/template/navigation_menu.php');
?>
<!--Link our ProjectSunshine custom css-->
<link rel="stylesheet" href="project_sunshine_web_app/properties/template/custom.css">
<!--Link specific JavaScript-->
<script src="sunshine.js?<?php echo time(); ?>" type="text/javascript"></script>
<!--Page specific content begins here-->
<!DOCTYPE html>
<html lang="en">
<div class="container-fluid">
	<div class="col-md-12 fluid">
		<div class="panel panel-gettingStarted">
		<div class="panel-heading">
			<div class="panel-title text-center">Insert better title here</div>
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
		</div><!--End panel body-->
		</div>
	</div>
</div>
<!--End getting started tab-->
</body>
</html>