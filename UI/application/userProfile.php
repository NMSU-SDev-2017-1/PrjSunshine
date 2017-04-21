<!--Begin user profile loading via php-->
<?php
//CHANGE ME
$userName = 'Zachary Toups';
//CHANGE ME

if($userName == 'none'){

}else{
	$userName = "Hello, ".$userName."!";
}

?>
<div class="container">
	<!--User profile-->
	<div class="col-md-3 img-overlay parent">
		<img class="image2" src="properties\images\profilePicture.jpg" align="middle">
	</div><!--End picture div-->
	<!--User statistics/hello-->
	<div class="col-md-3">
		<h3><?php  echo $userName; ?></h3>
		<p>Project Sunshine Statistics</p>
		<ul>
			<li>Number of photos take: </li>
			<li>Number of Sunrise photos: </li>
			<li>Number of Sunset photos: </li>
			<li>Average time of day for each photo: </li>
			<li>Average number of Instagram likes: </li>
			<li>Most popular photo: </li>
		</ul>
	</div>
</div>