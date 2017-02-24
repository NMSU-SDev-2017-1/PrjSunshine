## Problem Statement

 Introducing Project Sunshine, a Raspberry Pi with an integrated camera that automatically takes a photo of the rising sun and transmits that photo to the user's interface. In order to accomplish this overarching task, Project Sunshine can be divided into requirements specific for the user interface and Raspberry Pi. Certain requirements will necessitate that the user interface communicates effectively with the Raspberry Pi.

In laying out the initial problem statement, our team will detail a description of the device functionality from the user's perspective. The team has decided to embrace an incremental project development approach. A list of primary, secondary, and tertiary requirements has been included in the problem statement.

Description of Device Functionality – From User's Perspective

Upon receiving the Raspberry Pi preloaded with the Project Sunrise software, the user will find a user manual detailing how to setup the html user interface and properly sync it with the Raspberry Pi. The user powers on the Raspberry Pi, which comes with a battery pack in order to function independently of a power connection. Upon powering on, the Raspberry Pi will automatically boot its operating system and any necessary programming or background processes for Project Sunrise functionality. Since Project Sunrise uses a Raspberry Pi 3, the device will include integrated wifi hardware which will activate when the device powers on.

In order for the user to connect with the Raspberry Pi, s/he needs to establish a Wifi Direct connection with the Raspberry Pi. The user manual will specify how to setup this connection by going to her/his computer's network settings. Since the Raspberry Pi has been powered on and has active wifi capabilities, the user's computer will be able to detect the Raspberry Pi as one of the listed wifi devices found in network settings. The user manual will detail how the user selects a Wifi Direct connection to the Raspberry Pi and verifies an authentic connection through the Raspberry Pi's unique device ID and corresponding password. Both the Raspberry Pi's unique device ID and the password will be clearly listed in the user manual.

Now that a Wifi Direct connection has been established between the user's computer and the Raspberry Pi, the user manual will then instruct the user to go to a specific html site on her/his personal computer. Upon navigating to the site, the user will see a professional and visually pleasing splash page. The splash page will contain images of the rising and setting sun with four options specified with labeled buttons – a profile setup button, a help button, a button to setup taking a photograph of the rising sun, a button to setup taking a photograph of the setting sun, and a button to view and retrieve photographs stored on the Raspberry Pi. The user manual will specify that the user should first setup a user account; however, the user can always click on the help button in order to receive a message clarifying next steps.

The user account setup will consist of inputting the user's name and a user profile picture. If project iteration allows, we plan to implement Twitter account syncing through the user account setup page. Now that the user has setup an account, s/he can setup the Raspberry Pi to either take a photograph of the rising or setting sun, dependent on the user's choice. The user will be taken back to the initial html splash page and can select the button to either setup taking a photograph of the rising sun or setup taking a photograph of the setting sun. The user interface function similarly for either button with the major difference what time is transmitted to the Raspberry Pi.

For simplicity, we will assume that the user selects that s/he wants to take a photograph of the rising sun. For the scope of this project, the user will need an active internet connection on her/his computer in order to calculate the time of sunrise or sunset. Upon clicking the corresponding button, the user will be taken to a new web page which will ask for the user's zip code. The user interface will then retrieve the time of sunrise from an online database. This is similar to how a user can easily search for the time of sunrise using a simple Google search with the user's zip code as a parameter.

After the user interface retrieves the time of sunrise from an online database, the program will then retrieve the current time from the user's computer. Using the current time and the time of sunrise, the program will calculate the amount of time in seconds until sunrise. The user interface program will then transmit the number of seconds until sunrise to the Raspberry Pi as a integer value using a network pipeline.

Setup for the Raspberry Pi has now been completed, and the Raspberry Pi is ready to be positioned to take a photograph of the sunrise. The user manual will then instruct the user to place the Raspberry Pi in a position so that the integrated camera will take a photograph of the sunrise. The user can now wait for the Raspberry Pi to take a photograph of the next sunrise.

While the sunrise approaches, the Raspberry Pi will remain powered on and will track elapsing seconds until sunrise. The counter should reach zero at sunrise, and the Raspberry Pi program will instruct the integrated camera to take a photograph. The program will specify that the Raspberry Pi will store the photograph in a local folder in its memory. In order for the user to view or retrieve this photo, s/he can go to the user interface html page and select the corresponding button.

The user interface will then load a page displaying all photographs stored on the Raspberry Pi with each image labeled with the date corresponding to when the photograph was taken. The user can then view these images or download them to the user's computer. The user has now taken, stored, and retrieved her/his first photograph. Repeating this process for future photographs will be easy, as the user can continue to interact with the user interface html page.

List of Requirements:

Primary

    Raspberry Pi able to advertise itself as a network connection in order to connect to the html user interface using Wifi Direct.
    User interface incorporates user features including a customized user profile, a help page and buttons to setup taking a photography at either sunrise or sunset.
    User interface calculates the time for sunrise or sunset by accepting as an input the user’s zip code, searching an Internet database for the corresponding time, and converting that value to the number of seconds until sunrise or sunset.
    User interface transfers time, in seconds, to elapse before photograph is taken to the Raspberry Pi by utilizing a network pipeline.
    Raspberry Pi tracks seconds until time to take the photograph. Raspberry Pi then takes a photograph at the precise time of sunrise or sunset.
    Raspberry Pi stores photograph in a designated folder in its memory.
    User interface can connect to the Raspberry Pi via a network connection in order to view and download stored photographs.
    Synthesize detailed user manual that will to direct user on proper functionality and features of the Project Sunrise device.

Secondary

    Raspberry Pi syncs with user's Twitter account and automatically tweets the sunrise photograph.
    User interface allows user to take multiple photographs after sunrise or before sunset. User denotes the number of photographs to be taken and the time interval between photographs.

Tertiary

    Raspberry Pi gathers data from light sensor in order to automatically detect the sunrise.
    Develop Android app to implement user interface features.
    Raspberry Pi takes test shots during the camera setup phase. The user can immediately view these test shots on the user interface and use this information to reposition the Raspberry Pi camera.
    User interface gathers data from compass IMU.


## Contributors

Zanoni Contreras,
Lennyn Daza,
Heather Morgan,
Brian O'Dell,
John Rivers

