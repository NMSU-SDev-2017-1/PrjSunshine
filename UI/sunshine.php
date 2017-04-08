<?php
	require_once('properties/navigation_menu.php');
?>
<!--Page specific JavaScript-->
<script src="sunshine.js?<?php echo time(); ?>" type="text/javascript"></script>

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