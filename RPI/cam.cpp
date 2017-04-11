/*****************************************************************************
* RPI Camera                                                                 *
* Lennyn Daza                                                                *
* 10 April 2017                                                              *
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
	file.open("/var/www/html/IO/in/commands.sun");

	//Read word by word
	while (file >> word)
	{
		//Find file tags
		if (word.substr(0, 5) == "<set>")
		{
			pos1 = word.find("</set>");
			std::cout << "SET = " << word.substr(5, pos1 - 5) << std::endl;//(Debuging)
			//setNum = word.substr(5, pos1 - 5);
		}
		if (word.substr(0, 6) == "<date>")
		{
			pos2 = word.find("</date>");
			std::cout << "DATE = " << word.substr(6, pos2 - 6) << std::endl;//(Debuging)
			//date = word.substr(6, pos2 - 6);
		}
		if (word.substr(0, 6) == "<time>")
		{
			pos3 = word.find("</time>");
			std::cout << "TIME = " << word.substr(6, pos3 - 6) << std::endl;//(Debuging)
			//time = word.substr(6, pos3 - 6);
		}
		if (word.substr(0, 15) == "<pictureNumber>")
		{
			pos4 = word.find("</pictureNumber>");
			std::cout << "PICTURE NUMBER = " << word.substr(15, pos4 - 15) << std::endl;//(Debuging)
			//pictureNumber = word.substr(15, pos4 - 15);
		}
		if (word.substr(0, 10) == "<interval>")
		{
			pos5 = word.find("</interval>");
			std::cout << "INTERVAL = " << word.substr(10, pos5 - 10) << std::endl;//(Debuging)
			//interval = word.substr(10, pos5 - 10);
		}
		if (word.substr(0, 7) == "<delay>")
		{
			pos6 = word.find("</delay>");
			std::cout << "DELAY = " << word.substr(7, pos6 - 7) << std::endl;//(Debuging)

			//Convert to integer
			value = atoi(word.substr(7, pos6 - 7).c_str());
		}
		if (word.substr(0, 9) == "<camType>")
		{
			pos1 = word.find("</camType>");
			std::cout << "TYPE = " << word.substr(9, pos1 - 9) << std::endl;//(Debuging)

			camType = word.substr(9, pos1 - 9);

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
	cmdIntegrated = ("sudo raspistill -o ");
	cmdSLR = ("gphoto2 --capture-image-and-download --filename ");
	path = ("/var/www/html/IO/out/");
	date = ("02032017");
	ext = (".jpg");
	end = (" -n");

	//Date is the name of the picture (change as needed)
	//raspistill commands allow for time lapse and 
	//multiple protographs and other settings

	//Build string
	//Checks type of camera and make appropriate call
	if (camType == "RCAM")
	{
		syscall = cmdIntegrated + path + date + ext + end;
	}
	if (camType == "SLR")
	{
		syscall = cmdSLR + path + date + ext;
	}

	std::cout << syscall << '\n';//(Debuging) Make sure is the right command

	//Call command
	system(syscall.c_str());
	//Camera processing has about 3 seconds delay to take a picture

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
