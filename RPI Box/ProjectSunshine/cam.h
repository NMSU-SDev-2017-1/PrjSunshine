/*****************************************************************************
* RPI Camera (Version 1)                                                     *
* Lennyn Daza                                                                *
* 2 March 2017                                                               *
*****************************************************************************/

#pragma once

//#include <wiringPi.h> (GPIO calls)
#include <iostream>
#include <stdlib.h>
#include <fstream>
#include <string>
#include <stdio.h>
#include <time.h>
#include <unistd.h>
#include <array>
#include <vector>

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


	//get method for time delay
	int getCameraDelay() const
	{
		return value;
	}

private:

	//private variables for camera data
	std::string word = "";
	std::string data = "";

	int value = 0;

	//private variables for system call commands
	std::string syscall = "";
	std::string cmd = "";
	std::string path = "";
	std::string date = "";
	std::string ext = "";
	std::string end = "";

	/****************************************************
	* Function definitions                              *
	****************************************************/

	void readIn(int n);

	void takePic(int n);

};