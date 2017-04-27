<?php
  //When processing froms from PHP to PHP page we can store error and success messages into session
  //to alert the user of the status of a completed/failed action
  session_start();

	require_once('properties/navigation_menu.php');
  if(isset($_SESSION['error']) == true){
    echo '
    <div class="alert alert-danger">
      <strong>Error: </strong> '.$_SESSION['error'].'
    </div>
    ';
  }
  else if(isset($_SESSION['success']) == true){
    echo '
    <div class="alert alert-success">
      <strong>Success!</strong> Your profile has been updated
    </div>
    ';
  }
  //If are set, remove these values from session
  unset($_SESSION['success']);
  unset($_SESSION['error']);
?>
<!--Page specific JavaScript-->
<script src="sunshine.js?<?php echo time(); ?>" type="text/javascript"></script>

<!-- Include dependencies for bootstrap-tour -->
<link href="/properties/third_party_plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="/properties/third_party_plugins/bootstrap/css/bootstrap-tour.min.css" rel="stylesheet" />
<script src="/properties/third_party_plugins/jQuery/jquery-3.1.1.min.js" ></script>
<script src="/properties/third_party_plugins/bootstrap/js/bootstrap.min.js" ></script>
<script src="/properties/third_party_plugins/bootstrap/js/bootstrap-tour.min.js" ></script>
<script type="text/javascript">
   // Instance the tour
   var tour = new Tour({
   steps: [
   {
     element: "#menu1",
     title: "Step 1",
     content: "Go here to change your user profile"
   },
   {
     element: "#menu2",
     title: "Step 2",
     content: "Go here to take a picture"
   }
   ]});

   // Initialize the tour
   tour.init();

   // Start the tour
   tour.start();
</script>

<!--PAGE CONTENT BEGINS HERE-->
<div class="container">
  <!--
  	Change this section to include a horizontal banner, this portion of code in the between
  	the grey navigation menu and the clickable tabs
   -->
  <ul class="nav nav-pills">
    <li><a data-toggle="pill" href="#home">Home</a></li>
    <li><a data-toggle="pill" href="#menu1">User Profile</a></li>
    <li><a id="menu2Tab" data-toggle="pill" href="#menu2">Create new photo</a></li>
  </ul>
  <div class="tab-content">
    <!--Home div, containing information on project sunshine-->
    <div id="home" class="tab-pane fade in active">
    	<br>
    	<?php
      		require_once('application/home.php');
    	?>
    </div>
    <div id="menu1" class="tab-pane fade">
    	<br>
      	<?php
      		require_once('application/userProfile.php');
       	?>
    </div>
    <div id="menu2" class="tab-pane fade">
    	<br>
    	<?php
      		require_once('application/photo.php');
       	?>
    </div>
  </div>
</div>
