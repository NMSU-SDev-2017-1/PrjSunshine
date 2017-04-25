<?php  
$directory = "../IO/out/";
$images = glob($directory . "*.jpg");
echo '<div class="row">';
error_log(print_r($images,true));
foreach($images as $image)
{
  error_log($image);
  echo '<div class="col-md-4">';
  echo '<div class="thumbnail">';
  echo '<a href="'.$image.'">';
  echo '<img src="'.$image.'" style="width:100%">';
  echo '</a>';
  echo '</div>';
  echo '</div>';
}
?>
</div>