$(document).ready(function(){
	//Validation for user submits for photo
	$( "#submitTimePhoto" ).click(function() {
  		//Get user selected options
  		var hour = $('#hour').val();
  		var minute = $('#minute').val();
  		var timeOfDay = $('#12Hour').val();
  		
  		//Validate user responce
  		if(hour == 'none'){
  			failAlert('Please select an hour to take the photo');
  			return;
  		}
  		else if(minute == 'none'){
  			failAlert('Please select a minute to take the photo');
  			return;
  		}
  		else if(timeOfDay == 'none'){
  			failAlert('Please select either AM or PM to take the photo');
  			return;
  		}

  		if(timeOfDay == 'pm'){
  			hour = hour + 12;
  		}
  		//At this point, user has selected all require values
		var time = countDownTime(hour, minute, timeOfDay);
  		writeToFile(time);
	});

});//End doc on ready

//Purpose: Pass user values into text file to be read by Java program
function writeToFile(time){
		var promise = writeToFileAJAX(time);	
		promise.done(function(json){

 		});

    	promise.fail(function(json) {
    		failAlert('Failed to save information');
    	});
}

//Purpose: Write count down timer to file using AJAX
function writeToFileAJAX(time){
	return $.ajax({
        type: "POST",
        url: "AJAX_calls/writeToFile.php",
        dataType: "json",
        data: {
            time : time
        }
	})
}

//Purpose: Depending on time passed in by user, return the difference between current time and photo time
function countDownTime(userHour, userMinute){
	var date = new Date;
	var currentSecond = date.getSeconds();
	var currentMinute = date.getMinutes();
	var currentHour = date.getHours();
	var hour = 0;
	var minute = 0;
	var second = 0;
	var timeSum = 0;
	console.log(currentHour);
	console.log(currentMinute);
	console.log(currentSecond);
	//Hour conversion
	if(currentHour > userHour){
		hour = currentHour - userHour;
	}else{
		hour = userHour - currentHour;
	}
	//Convert hour into seconds
	hour = hour*3600;

	//Minute conversion
	if(currentMinute > userMinute){
		minute = currentMinute - userMinute;
	}else{
		minute = userMinute - currentMinute;
	}
	minute = minute * 60;

	timeSum = hour + minute + currentSecond;

	return timeSum; 
}

//Purpose: Depending on action taken by user, alert them with message displayed in red
function failAlert(message){
	$(".WarningMessage").html(message).toggle();
    $( ".WarningMessage" ).delay( 3000 ).fadeOut(200);   
}