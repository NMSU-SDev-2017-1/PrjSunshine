/*****************************************************************************
* RPI Camera (Version 1)                                                     *
* Lennyn Daza                                                                *
* 2 March 2017                                                               *
*****************************************************************************/

#include "cam.h"


//Class constructor
Cam::Cam(void)
{
	std::cout << "Class created" << std::endl;
}

//Class destructor
Cam::~Cam(void)
{
	std::cout << "Class deleted" << std::endl;
}

/****************************************************************************
* Function reads command file word by word                                  *
****************************************************************************/
void Cam::readIn(int n)
{
	std::ifstream file;

	file.open("Input/commands.sun");   // UI will save file to /var/www/html/"RPI Box"/ProjectSunshine/Input/commands.sun

	//Read word by word
	while (file >> word)
	{
		//Find tag (Just one tag)
		if (word == "DELAY=")
		{
			//Get next word and load into data
			//in file contains delay value
			file >> data;

			//Convert to integer
			value = atoi(data.c_str());
		}

		word.clear();
		data.clear();
	}

	//Load into string/int array or save in new file where jobs are kept

}//End FCN

 /****************************************************************************
 * Function takes a picture and stores it in the Pictures directory          *
 ****************************************************************************/
void Cam::takePic(int n)
{

	//Command format
	cmd = ("sudo raspistill -o ");
	path = ("/home/pi/ProjectSunshine/Pictures/");
	date = ("02032017");
	ext = (".jpg");
	end = (" -n");

	//Date is the name of the picture (change as needed)
	//raspistill commands allow for time lapse and 
	//multiple protographs and other settings

	//Build string
	syscall = cmd + path + date + ext + end;

	std::cout << syscall << '\n';//(Debuging)

	//Call command
	system(syscall.c_str());
	//Camera processing has about 3 seconds delay to take a picture

	std::cout << "Picture was taken and stored" << std::endl;//(Debuging)

}//End FCN

 /****************************************************************************
 * Main Entry                                                                *
 ****************************************************************************/
int main() 
{
	//Class object instance
	Cam camera;

	//Variables for timing loop
	int iter = 0;
	int timedelay = 0;

	//Read run boolean from config file or other structure file

	//Main loop ON
	bool run = true;

	/********************************************************* (It always runs but in this example it terminates at end of loop)
	* Program main infinite loop                             *
	*********************************************************/
	while (run)
	{
		
		//Read command file (Delay to read/write to file)
		camera.readInput(0);

		sleep(1);//Delay in seconds (change to miliseconds)

		//Get value from function
		timedelay = camera.getCameraDelay();

		std::cout << "Delay from file = " << timedelay << std::endl;//(Debuging)


		/********************************************************* (Good for just delaying a few seconds - Use system time instead)
		* Countdown using delay value (1 second delays)          *  After this loop completes next line is take picture function
		*********************************************************/
		while (iter < timedelay)
		{
			sleep(1);//Delay in seconds

			std::cout << "Countdown = " << iter << std::endl;//(Debuging)

			iter++;
		}

		//If picture was not taken call fcn or if job logs says it was taken then ignore
		//Check job file logs???

		/*********************************************************
		* Take picture                                           *
		*********************************************************/
		camera.takePicture(0);

		//INFO
		//Add current job file read/write using commands.sun (comm file)
		//to check for current or new jobs and mark off past jobs and
		//to be able to take a test shot before main picture event
		//rename or organize better file structure and loops
		//to keep running normally instead of once


		//Change run to false in config file or other struture file

		//Terminate loop
		run = false;

	}//End infinite loop
    
    return 0;
    //system("pause");//(Debuging)

}//End MAIN
