$(document).ready(function(){
  $( ".tablinks" ).click(function(){
        var tabText = $(this).text();
        
        hideAllDataTables();
        openReportTab(event, tabText);
    });
  
  //Always have academic as default open tab
  document.getElementById("menu2Tab").click();
});//End doc on ready

$(document).on("click","#submitTimePhoto",function() {
  //Get user selected options
  var hour = $('#hour').val();
  var minute = $('#minute').val();
  var timeOfDay = $('#12Hour').val();
  var camType = $('#camType').val();
  
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
  else if(camera == 'none'){
    failAlert('Please select either integrated or SLR camera for taking the photo');
    return;
  }

  writetoUsername(hour, minute, timeOfDay);
});
//Purpose: Pass user values into text file to be read by Java program
function writeToFile(hour, minute, timeOfDay, camType){
		var promise = writeToFileAJAX(hour, minute, timeOfDay, camType);	
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
function writeToFileAJAX(hour, minute, timeOfDay, camType){
	return $.ajax({
        type: "POST",
        url: "project_sunshine_web_app/AJAX_calls/writeToFile.php",
        dataType: "json",
        data: {
            hour: hour,
            minute : minute,
            timeOfDay: timeOfDay,
	    camType : camType
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
//Purpose: On click, open tab selected by user
function openReportTab(evt, textValue) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(textValue).style.display = "block";
    evt.currentTarget.className += " active";
}