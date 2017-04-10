/*****************************************************************************
* RPI Camera                                                                 *
* Lennyn Daza                                                                *
* 10 April 2017                                                              *
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

#include <unistd.h>//Linux

//#include <windows.h>
//#include <conio.h>
//#include <dos.h>

//#include "stdafx.h"

class Cam
{

public:


	//Scope resolution for constructor/destructor?

	Cam();

	~Cam();

	/****************************************************
	* Access to private function                        *
	****************************************************/

	void readInput(int n) { readIn(n); }

	void takePicture(int n) { takePic(n); }

	void jobTasks() { jobtks(); }

	void timeDelay() { timedly(); }

	//get method for time delay
	int getCameraDelay() const
	{
		return value;
	}

private:

	//private variables for camera data
	std::string word = "";
	std::string data = "";
	std::string camType = "";

	int value = 0;
	unsigned long long int timestp = 0;

	//String position variables
	std::size_t pos1 = 0;
	std::size_t pos2 = 0;
	std::size_t pos3 = 0;
	std::size_t pos4 = 0;
	std::size_t pos5 = 0;
	std::size_t pos6 = 0;
	std::size_t pos7 = 0;
	std::size_t pos8 = 0;

	//Variables for timing loop
	int iter = 0;
	int timedelay = 0;

	//private variables for system call commands
	std::string syscall = "";
	std::string cmdIntegrated = "";
	std::string cmdSLR = "";
	std::string path = "";
	std::string date = "";
	std::string ext = "";
	std::string end = "";

	/****************************************************
	* Function definitions                              *
	****************************************************/

	void readIn(int n);

	void takePic(int n);

	void jobtks();

	void timedly();

};


