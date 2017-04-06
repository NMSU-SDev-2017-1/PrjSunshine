$(document).ready(function(){
  //On page load if user has photos within images directory show div with content
  checkForPhotos();
});//End doc on ready

//---------------------------------------------------------------
//************************
//Validation and processing for user submits for photo
//************************
//---------------------------------------------------------------
$(document).on("click","usernameprofile",function() {
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
$(document).on("click","#submitTimePhoto",function() {
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

  writetoUsername(hour, minute, timeOfDay);
});
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
function writetoUsername(image, username){
    var promise = createUserProflie(image, username); 
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
        url: "project_sunshine_web_app/AJAX_calls/writeToFile.php",
        dataType: "json",
        data: {
            hour: hour,
            minute : minute,
            timeOfDay: timeOfDay
        }
      })
}
function createUserProflie(image, username){
  return $.ajax({
        type: "POST",
        url: "project_sunshine_web_app/AJAX_calls/user.php",
        dataType: "json",
        data: {
            image: image,
            username: username
        }
      })
}
    

//---------------------------------------------------------------
//************************
//Show images
//Purpose: If user has any items witnin images subfolder display associated div to display photos
//************************
//---------------------------------------------------------------
function checkForPhotos(){

}
//
//---------------------------------------------------------------
//************************
//Various divs and warning associated with messages for user
//************************
//---------------------------------------------------------------
//Purpose: Depending on action taken by user, alert them with message displayed in red
function failAlert(message){
	$(".WarningMessage").html(message).toggle();
    $( ".WarningMessage" ).delay( 3000 ).fadeOut(200);   
}

function successAlert(message){
	$(".PopupPanel").html(message).toggle();
  $( ".PopupPanel" ).delay( 3000 ).fadeOut(200);
}