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

  		writeToFile(hour, minute, timeOfDay);
	});

});//End doc on ready

//Purpose: Pass user values into text file to be read by Java program
function writeToFile(hour, minute, timeOfDay){
		var promise = writeToFileAJAX(hour, minute, timeOfDay);	
		promise.done(function(json){
      failAlert(json);
 		});

    	promise.fail(function(json) {
    		failAlert('Failed to save information');
    	});
}

//Purpose: Write count down timer to file using AJAX
function writeToFileAJAX(hour, minute, timeOfDay){
	return $.ajax({
        type: "POST",
        url: "AJAX_calls/writeToFile.php",
        dataType: "json",
        data: {
            hour: hour,
            minute : minute,
            timeOfDay: timeOfDay
        }
	})
}

//Purpose: Depending on action taken by user, alert them with message displayed in red
function failAlert(message){
	$(".WarningMessage").html(message).toggle();
    $( ".WarningMessage" ).delay( 3000 ).fadeOut(200);   
}

function successAlert(message){
	$(".PopupPanel").html(message).toggle();
  $( ".PopupPanel" ).delay( 3000 ).fadeOut(200);
}