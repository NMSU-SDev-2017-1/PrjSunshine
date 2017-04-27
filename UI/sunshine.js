$(document).ready(function(){
  $( ".tablinks" ).click(function(){
        var tabText = $(this).text();

        hideAllDataTables();
        openReportTab(event, tabText);
   });

  //Always have academic as default open tab
  document.getElementById("menu2Tab").click();

  $( "#submitTimePhoto" ).click(function(){
    submitTimePhoto();
  });

  $( "#zipCodePhoto" ).click(function(){
    submitZipCodePhoto();
  });

  // Instance the tour
  $(function() {
    var tour = new Tour({
    steps: [
    {
        element: "#menu1Tab",
        title: "Step 1",
        content: "Go here to change your user profile"
    },
    {
        element: "#menu2Tab",
        title: "Step 2",
        content: "Go here to take a picture"
    }
    ]});

    // Initialize the tour
    tour.init();
    // Start the tour
    tour.start();
  });
});//End doc on ready

function submitTimePhoto(){
  //Get user selected options
  var hour = $('#hour').val();
  var minute = $('#minute').val();
  var timeOfDay = $('#12Hour').val();
  var camType = $('#camera').val();

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
  else if(camType == 'none'){
    failAlert('Please select either integrated or SLR camera for taking the photo');
    return;
  }

  writeToFile(hour, minute, timeOfDay,camType);
}
//Purpose: Pass user values into text file to be read by Java program
function writeToFile(hour, minute, timeOfDay, camType){
  $.ajax({
    type: "POST",
    url: "AJAX_calls/writeToFile.php",
    dataType: "json",
    data: {
      hour: hour,
      minute : minute,
      timeOfDay: timeOfDay,
      camType : camType
    }
  })
  .done(function(json){
    successAlert('Successfully writen task to file.');
  })
  .fail(function(json) {
    failAlert('Writing to file has failed, please reload page and try again.');
  });
}
//Purpose: Validate and process user information for a photo to be taken via zip code
function submitZipCodePhoto(){
  var zipCode = $('#zipCode').val();
  if(zipCode.length == 0){
    failAlert('To use this feature please enter a zip code.');
    return;
  }
  if(zipCode.length != 5){
    failAlert('Zip code must be 5 digits long, please reenter');
    return;
  }
  //At this point user input can be processed, begin by retriving nessesary zip code information
  $.ajax({
    type: "POST",
    url: "AJAX_calls/writeToFileZipCode.php",
    dataType: "json",
    data: {
      zipCode: zipCode
    }
  })
  .done(function(json){
    var fileDirections = "Photo directions: <br>";
    if(json == 'NULL'){
      fileDirections += "Zip code "+zipCode+" could not be found, please ensure this zip code is correct";
    }else{
      fileDirections += json;
    }

    //Append information to informational div
    $('#photoInto').html(fileDirections);
    $('#photoInto').show();
  })
  .fail(function(json){
    failAlert('Find Zip Code '+zipCode+' has failed, please ensure this Zip Code is correct.');
  });
}
//---------------------------------------------------------------
//--------------------------
//Various divs and warning associated with messages for user
//--------------------------
//---------------------------------------------------------------
//Purpose: Depending on action taken by user, alert them with message displayed in red
function failAlert(message){
	$("#warningMessage").html(message).toggle();
  $( "#warningMessage" ).delay( 3000 ).fadeOut(200);
}
function successAlert(message){
	$("#successMessage").html(message).toggle();
  $( "#successMessage" ).delay( 3000 ).fadeOut(200);
}
function fatalError(message){
  $("#fatalErrorWarning").append(message);
  $("#fatalErrorWarning").show();
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

    hideDivs();
}

//Purpose: Depdeding on user action, div informational divs
function hideDivs(){
  $('#photoInto').hide();
}
