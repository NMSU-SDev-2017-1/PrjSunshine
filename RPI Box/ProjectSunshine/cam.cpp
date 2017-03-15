/*****************************************************************************
* RPI Camera                                                                 *
* Lennyn Daza                                                                *
* 15 March 2017                                                              *
*****************************************************************************/

#include "cam.h"
#include "blackboard.h"

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

void printdata(pictasks printd)
{
	std::cout << "========================\n";
	//std::cout << " (" << printd.date << ")\n";
	//std::cout << " (" << printd.time << ")\n";
	std::cout << " (" << printd.delay << ")\n";
	std::cout << " (" << printd.done << ")\n";

	std::cout << "size: " << jobs.size() << '\n';

	while (iterator < jobs.size())
	{

		std::cout << "Array " << iterator << " = Delay =" << jobs[iterator].delay << " Task =" << jobs[iterator].done << std::endl;
		iterator++;
	}

	std::cout << "========================\n";

	iterator = 0;
}

/****************************************************************************
* Function reads command file word by word                                  *
****************************************************************************/
void Cam::readIn(int n)
{
	std::ifstream file;

	//file.open("Input/commands.sun");
	// UI will save file to /var/www/html/"RPI Box"/ProjectSunshine/Input/commands.sun
	file.open("/var/www/html/"RPI Box"/ProjectSunshine/Input/commands.sun");

	//Read word by word
	while (file >> word)
	{
		//Find tag (Just three tags)
		if (word == "DATE=")
		{
	
		}
		if (word == "TIME=")
		{

		}
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
	//path = ("/home/pi/ProjectSunshine/Pictures/");
	path = ("/var/www/html/"RPI Box"/ProjectSunshine/Pictures/");
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
	//Sleep(3000);//Camera processing has about 3 seconds delay to take a picture

	std::cout << "Picture was taken and stored" << std::endl;//(Debuging)

	//Find time delay job and mark it as done
	while (iterator < jobs.size())
	{
		if (jobs[iterator].delay == n && jobs[iterator].done == false)
		{
			jobs[iterator].done = true;
		}

		iterator++;
	}
	iterator = 0;

}//End FCN

 /**************************************************************************** (Move to own file) (Need unique identifier)
 * Function adds picture job task to blackboard                              *
 ****************************************************************************/
void Cam::jobtks()
{
	
	//Get value from function
	timedelay = getCameraDelay();

	if (jobs.size() == 0)
	{
		task1.delay = timedelay;
		task1.done = false;

		jobs.push_back(task1);
	}
	if (jobs.size() > 0)
	{
		//Check for previous jobs
		while (iterator < jobs.size())
		{
			if (jobs[iterator].delay != timedelay && jobs[iterator].done == true)
			{
				task1.delay = timedelay;
				task1.done = false;

				jobs.push_back(task1);
			}

			iterator++;
		}

		iterator = 0;
		timedelay = 0;
	}

	//Iterate through array
	//check if same job exist
	//load into array

	printdata(task1);

}//End FCN

void Cam::timedly()
{
	//Get value from function
	timedelay = getCameraDelay();

	//Check for current job to execute
	while (iterator < jobs.size())
	{
		if (jobs[iterator].delay == timedelay && jobs[iterator].done == false)
		{
			
			std::cout << "Delay from file = " << timedelay << std::endl;//(Debuging)

			/********************************************************* (Good for just delaying a few seconds - Use system time instead)
			* Countdown using delay value (1 second delays)          *  After this loop completes next line is take picture function
			*********************************************************/
			while (iter < timedelay)
			{
				sleep(1);//Delay in seconds
				//Sleep(1000);//Delay in miliseconds

				std::cout << "Countdown = " << iter << std::endl;//(Debuging)

				iter++;
			}

			//If picture was not taken call fcn or if job logs says it was taken then ignore
			//Check job file logs???

			/*********************************************************
			* Take picture                                           *
			*********************************************************/
			takePicture(timedelay);

			//Clear variables
			iter = 0;
			timedelay = 0;
		}

		iterator++;
	}
	iterator = 0;

}//End FCN

 /****************************************************************************
 * Main Entry                                                                *
 ****************************************************************************/
int main() 
{
	//Class object instance
	Cam camera;

	//BlackBoard state1;

	//Read saved state (Only on bootup or crash)

	//Read run boolean from config file or other structure file

	//Main loop ON
	bool run = true;

	/********************************************************* (It always runs but in this example it terminates at end of loop)
	* Program main infinite loop                             *
	*********************************************************/
	while (run)
	{
		
		//Read command file (Delay to read/write to file)  //Drop to picture jobs state black board
		camera.readInput(0);
		sleep(1);//Delay in seconds (change to miliseconds)
		//Sleep(10);//Delay in miliseconds

		//Send to job state (blackboard struct)
		camera.jobTasks();

		//Delay and other function
		//Get current time

		//Read blackboard get current job if time is ready and checkmark done jobs
		camera.timeDelay();

		//Output file

		//INFO
		//Add current job file read/write using commands.sun (comm file)
		//to check for current or new jobs and mark off past jobs and
		//to be able to take a test shot before main picture event
		//rename or organize better file structure and loops
		//to keep running normally instead of once

		printdata(task1);
		//Clean old jobs (Every 10 loops)

		//Save state function

		//Change run to false in config file or other struture file

		//Terminate loop
		//run = false;

	}//End infinite loop
    
    return 0;
    //system("pause");//(Debuging)

}//End MAIN
