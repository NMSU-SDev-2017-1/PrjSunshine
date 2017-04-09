/*****************************************************************************
* RPI Camera                                                                 *
* Lennyn Daza                                                                *
* 15 March 2017                                                              *
*****************************************************************************/

#pragma once

//#include <wiringPi.h> (GPIO calls)
#include <iostream>
#include <stdlib.h>
#include <fstream>
#include <string>
#include <stdio.h>
#include <time.h>
#include <array>
#include <vector>

//#include "stdafx.h"

int iterator = 0;

struct pictasks
{
	std::string date;
	int time;
	int delay;
	std::string camType;
	bool done;

}task1, task2;

std::vector<pictasks> jobs;

void printdata(pictasks printd);


/****************************************************
*                                                   *
****************************************************/
class BlackBoard
{

public:

	BlackBoard();

	~BlackBoard();

	/****************************************************
	* Access to private function                        *
	****************************************************/

private:

	/****************************************************
	* Function definitions                              *
	****************************************************/

};
