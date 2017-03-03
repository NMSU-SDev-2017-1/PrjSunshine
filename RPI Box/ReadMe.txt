
Program uses RaspiCam and its raspistill application programs using system calls. 

raspistill is the command line tool for capturing still photographs with the camera module.

RaspiCam is the main RPI camera library and is installed as an updated once the camera is enable. Other libraries can be use to accomplish same results.

The program structure is in a directory named ProjectSunshine which has the main .cpp and .h files and three sub directories Data, Input, and Pictures.

Data directory contains scripts, storage files, configuration and initiation files.

Input directory contains sunshine.sun which are the commands sends over the WiFi connection Web server or any other UI. It only needs the DELAY= tag but other tags are in place.

Pictures directory stores the pictures taken which can be retrieve by serving them out and delete or rename them through commands.

Camera program when execute it will run once reading the input delay in seconds from the tag DELAY= in file sunshine.sun. Then delay that amount of time then take a picture and store it in the folder Pictures. 

Name of the picture file needs to change either by time taken or by incremental ID number. (code allows room to make this)

Camera code needs a way to start and stop after identifying that it has a photograph job if not then it will take pictures every time from the input file or jobs read from configuration or other file. Infine loop is in place but has been turned off to run only once.

Start up scripts are in the Data directory but are not set to run until infinite loop works better.

Scripts were use in another project but they are there as an example on how to start a program from booting up. Some use a while loop and for some programs scripts are not needed they can be call straight from a cron job. 

No need for scripts only for persistent network connections.
