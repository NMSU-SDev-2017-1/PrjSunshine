
##Project Sunshine## 
Version 1 

Created by
John Rivers

Developed by
Brian O'Dell
Heather Morgan
John Rivers
Lennyn Daza
Zanoni Contreras	

	
	What is it?	
	-----------
	Project Sunshine provides users with an easy and convenient way to take and share the perfect photo of the sunrise or sunset.
	Project Sunshine integrates a hardware box with a Raspberry Pi (RPI) microcontroller board and an attached camera with a 
	simple and elegant user interface. The user interface allows for a customized user experience for setting up multiple timed 
	photos of the sunrise or sunset. This information is seamlessly transmitted to the RPI through a wireless connection. The RPI
	will then automatically take the scheduled photo(s) and save them on its hard drive. Photos can then be easily retrieve and
	shared by the user interface.

	What you will need
	------------------
	
	A computer or phone able to connect to a wifi connection
	Raspberry Pi 3 Model B microcontroller board withintegrated Wi-Fi hardware 
    RPI attached camera
	RPI attached battery pack	
	For taking a photo with an SLR must be a nikon camera.(currently does not work with cannons)
	For posting to twitter you will need an either net connection to the RPI.


	How to install
	--------------
        Clone or download the repository on a Rasperry Pi (Must be running Raspbian Jessie). While inside the directory the files are 
	in, type "sudo ./install.sh" without the quotation marks. Enter yes at all the prompts, then reboot the pi. In the device the
	user wants to use to control the Pi, Connect to the Wifi network Sunshine. The password is "projectsunshine"  .  
	When connected, enter 192.168.42.1 into a web browser. From there the user will have acess to the application.
	
	If the user enters "sudo ./install -h" you can see the options for the script. They include uninstalling, and updating 
	the files in the server.
	
	How to build
	------------
	Building the main applicaiton is also handled by the install application. See those instructions above.
	
	Current Version
	---------------
	Allows for the user to select, when they want to take a picture weither its timed or at sunrise. It also allows for user to 
	select which device they wish to use weither it is a DSLR or the Raspberry Pi camera. Stores data from the User, such as a 
	User Photo, name and the statistics of the User. This will also control the Raspberry Pi to become a host for the UI and for 
	it to take a picture. 
	
		
	File Structure - with discriptions
	--------------
	Files:
	Install - carries all files for initial setup
	 config.sun 
	 dhcpadd.sun
	 hostapdadd.sun
	 interfaceadd.sun
	IO - file is how the hardware and UI interact in carries files to command the PI out holds the photos taken
	 in
	  commands.sun
	 out
	  images
	MISC - file with project inforamtion
	 Project Media
	 camera Info.pdf
	 crontab.txt
	 Drawer.pdf
	 Drawer.xml
	 RaspiCam-documentation.pdf
	 UML.odg
	RPI - C++ files that hold the information to read commands and then take a photo also will countdown till time to take it.
	 Data
	   osrun.py
	   savedstate.s
	   sunshine.conf
	   sunshine.ini
	 blackboard.cpp
	 blackborard.h
	 cam.cpp
	 cam.h
	Twitter - for authentication to connect to twitter using users info
	 twitteroauth
	   OAuth.php
	   twitteroauth.php
	 .DS_Store
	 README.md
	 twitter.php
	UI - Files(PHP, JavaScript, JSON) for uploading the UI also caluations to send the information to hardware.
	 AJAX_calls - storage of object files from the UI
	  ProcessProfile.php
	  SunshineData.json
	  updateUserStatistics.php
	  userProfile.json
	  writeToFile.php
	  writeToFileZipcode.php
	 application - user information for photos and user profile
	  photo.php
	  userPhoto.php
	  userProfile.php
	 properties  - set up files
	  images
	  template
	  third_party_plugins
	  dev_env.txt
	  navigation_menu.php
	  Slideshow.php
	 SunCalculations.js
	 sunshine.js
	 Sunshine.php
	 
	
	
