<!-- 
  Files included in this page should be stlye sheets common across all pages 
  i.e Bootstrap and jQuery 
-->
<head>
  <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
  
	<title>Project Sunshine</title>
  <!-- Include jQuery -->
  <script src="properties/third_party_plugins/jQuery/jquery-3.1.1.min.js"></script>

  <!-- Bootstrap (Note: Bootstrap required jQuery, include after jQuery-->
  <link href="properties/third_party_plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <script src="properties/third_party_plugins/bootstrap/js/bootstrap.js"></script> 

  <!--Custom css-->
  <link rel="stylesheet" href="properties/template/custom.css">
</head>
<!--Navigation menu-->
<!-- 
  Note: As this project grows, we can uncomment navigation bars as needed
 -->
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button> -->
      <a class="navbar-brand" href="#">Project Sunshine</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <!-- <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div>/.navbar-collapse
      </div>/.container-fluid -->
</nav>
<!-- End top header-->

<!--For Fatal errors, append text values to div below-->
<div class="col-md-12 fluid" id="fatalErrorWarning">
  <div class="alert" style="display:none">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  </div>
</div>