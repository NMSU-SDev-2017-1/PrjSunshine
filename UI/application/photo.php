<div class="col-md-12">
	<!--User options for a timed photo-->
	<div class="panel panel-gettingStarted">
		<div class="panel-heading">
			<div class="panel-title text-left">Timed Photo</div>
		</div>
	<div class="panel-body">
		<!-- Hour -->
		<div class="col-md-4">
			<label>Hour: </label>
			<select class="form-control" id="hour">
				<option value='none'>Select Hour</option>
				<?php  
					for($i=1; $i < 13; $i++){ 
						$optionStringHour = '<option value="';
						$optionStringHour .= $i.'">'.$i.'</option>';
						echo $optionStringHour;
					}
				?>
			</select>
		</div>
		<!-- Minutes -->
		<div class="col-md-4">
			<label>Minute: </label>
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
		<!--Time of Day-->
		<div class="col-md-4">
			<label>AM/PM: </label>
			<select class="form-control" id="12Hour">
				<option value='none'>Select time of day</option>
				<option value="am">AM</option>
				<option value="pm">PM</option>
				</select>
				<br>
		</div>
		<!--Camera Type-->
		<div class="col-md-4", id>
			<label>Camera: </label>
			<select class="form-control" id="camera">
				<option value='none'>Select camera</option>
				<option value="integrated">intergrated</option>
				<option value="SLR">SLR</option>
				</select>
				<br>
		</div>
		<!-- Submit button and padding-->
		<div class ="col-md-10">
		</div>
		<div class="col-md-2">
			<button id="submitTimePhoto" class="btn btn-primary form-control pull-right">Submit</button>
		</div>
	</div><!--End panel body-->
	</div><!--End panel-->
	<!--End timed photo-->

	<!--Zip code photo-->
	<!--Allow user to create photo only entering their -->
	<div class="panel panel-gettingStarted">
		<div class="panel-heading">
			<div class="panel-title text-left">Photo by Zip Code</div>
		</div>
		<div class="panel-body">
		<div class="col-md-12">
			<!--Info div for us to append camera positioning for user-->
			<div class="alert alert-info" style="display:none"></div>
			<ul>
				<li>Enter the zip code for the location your photo will be taken.</li>
				<li>
					By entering your zip code, we will set up our photo for you!
					After doing a little math, we can let you know <b>exactly</b> how to position your camera for the perfect shot.
				</li>
			</ul>
			<div class="col-md-4">
				<label>Zip Code:</label>
	  			<input type="text" class="form-control" id="zipCode" maxlength="5">
			</div>
			<div class="col-md-2 pull-right">
				<br>
				<button id="zipCodePhoto" class="btn btn-primary form-control">Submit</button>
			</div>
		</div><!--End container-->
		</div><!--End panel body-->
	</div><!-- End panel -->
	<!--End Zip code photo-->
</div><!--End main container-->