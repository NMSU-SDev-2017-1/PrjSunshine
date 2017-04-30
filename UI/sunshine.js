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

  //Purpose: Tutorial button triggers bootstrap tour event
  $( "#tutorial" ).click(function(){
    $('#tutorialUserProfile').modal('show');
  });

  $( "#modalPhoto" ).click(function(){
    $('#tutorialPhoto').modal('show');
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
  updateUserStatistics('');
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
      //Zip code has been found, begin sunraise calculation
      var latitude = json.LAT;
      var longitude = json.LNG;

      var dateObj = new Date();
      //months from 1-12
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      var zip = zipCode;

      //Boolean variable for sunrise/sunset
      var sunrise = true;
      
      //Variable suncalculation is minutes until sunrise
      var sun_calculation = calcSun(month, day, year, zip,  sunrise,latitude, longitude);
      console.log('First calculation: ' + sun_calculation);
      //Sunrise for today has passed, calculate the one for tomorrow
      if(sun_calculation < 0){
        monthArray = [];
        monthArray[1] = 31;
        monthArray[2] = 28;
        monthArray[3] = 31;
        monthArray[4] = 30;
        monthArray[5] = 31;
        monthArray[6] = 30;
        monthArray[7] = 31;
        monthArray[8] = 31;
        monthArray[9] = 30;
        monthArray[10] = 31;
        monthArray[11] = 30;
        monthArray[12] = 31;
        dateObj = new Date();
        
        day = dateObj.getUTCDate();
        month = dateObj.getUTCMonth();
        year = dateObj.getUTCFullYear();
        if(monthArray[month] < day + 1){
          day = 1;
          if(month + 1 > 12){
            month = 1;
            year = year + 1;
          }
        }else{
          day = day + 1;
        }

        sun_calculation = calcSun(month, day, year, zip,  sunrise,latitude, longitude);
        console.log('Second calculation yields: ' + sun_calculation);
      }

      var hour = dateObj.getHours() + (sun_calculation/60);
      var minute = dateObj.getMinutes() + (sun_calculation%60);
      var timeOfDay = 'AM';
      var camType = $('#cameraZipCode').val();
      console.log('Written values are: ');
      console.log('Hour: ' + hour);
      console.log('Minute ' + minute);
      writeToFile(hour, minute, timeOfDay, camType);
      updateUserStatistics('sunrise');
    }

    //Append information to informational div
    $('#photoInto').html(fileDirections);
    $('#photoInto').show();
  })
  .fail(function(json){
    failAlert('Find Zip Code '+zipCode+' has failed, please ensure this Zip Code is correct.');
  });
}
//Purpose: Functions associated with incrementing the stored number of photos taken
//If sunrise is null, then only number of photos is updated
function updateUserStatistics(sunrise){
  $.ajax({
    type: "POST",
    url: "AJAX_calls/updateUserStatistics.php",
    dataType: "json",
    data: {
      sunrise: sunrise
    }
  })
  .done(function(json){
    console.log('Updating user profile has complete.');
  })
  .fail(function(json) {
    console.log('Updating user profile has failed');
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

//Purpose: Depdeding on user action, hide photo informational div. This div shows zip code and camera postioning information
function hideDivs(){
  $('#photoInto').hide();
}