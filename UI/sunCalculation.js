//*********************************************************************/

// Code adabted from https://www.esrl.noaa.gov/gmd/grad/solcalc/sunrise.html
	
//*********************************************************************/

//***********************************************************************/
//***********************************************************************/
//*												*/
//*This section contains subroutines used in calculating solar position */
//*												*/
//***********************************************************************/
//***********************************************************************/
var monthList = new Array();	//	list of months and days for non-leap year
	var i = 0;
	monthList[i++] = new month("January", 31, "Jan");
	monthList[i++] = new month("February", 28, "Feb");
	monthList[i++] = new month("March", 31, "Mar");
	monthList[i++] = new month("April", 30, "Apr");
	monthList[i++] = new month("May", 31, "May");
	monthList[i++] = new month("June", 30, "Jun");
	monthList[i++] = new month("July", 31, "Jul");
	monthList[i++] = new month("August", 31, "Aug");
	monthList[i++] = new month("September", 30, "Sep");
	monthList[i++] = new month("October", 31, "Oct");
	monthList[i++] = new month("November", 30, "Nov");
	monthList[i++] = new month("December", 31, "Dec");
	
	
	function month(name, numdays, abbr) 
	{
		this.name = name;
		this.numdays = numdays;
		this.abbr = abbr;
	}

// Convert radian angle to degrees
//save

	function radToDeg(angleRad) 
	{
		return (180.0 * angleRad / Math.PI);
	}

//*********************************************************************/

// Convert degree angle to radians

	function degToRad(angleDeg) 
	{
		return (Math.PI * angleDeg / 180.0);
	}

//*********************************************************************/


//***********************************************************************/
//* Name:    calcJD									*/
//* Type:    Function									*/
//* Purpose: Julian day from calendar day						*/
//* Arguments:										*/
//*   year : 4 digit year								*/
//*   month: January = 1								*/
//*   day  : 1 - 31									*/
//* Return value:										*/
//*   The Julian day corresponding to the date					*/
//* Note:											*/
//*   Number is returned for start of day.  Fractional days should be	*/
//*   added later.									*/
//***********************************************************************/

	function JD(year, month, day)
	{
		if (month <= 2) {
			year -= 1;
			month += 12;
		}
		var A = Math.floor(year/100);
		var B = 2 - A + Math.floor(A/4);

		var JDay = Math.floor(365.25*(year + 4716)) + Math.floor(30.6001*(month+1)) + day + B - 1524.5;
		return JDay;
	}



//***********************************************************************/
//* Name:    calcDateFromJD								*/
//* Type:    Function									*/
//* Purpose: Calendar date from Julian Day					*/
//* Arguments:										*/
//*   jd   : Julian Day									*/
//* Return value:										*/
//*   String date in the form DD-MONTHNAME-YYYY					*/
//* Note:											*/
//***********************************************************************/

	function calcDateFromJD(jd)
	{
		var z = Math.floor(jd + 0.5);
		var f = (jd + 0.5) - z;

		if (z < 2299161) {
			var A = z;
		} else {
			alpha = Math.floor((z - 1867216.25)/36524.25);
			var A = z + 1 + alpha - Math.floor(alpha/4);
		}

		var B = A + 1524;
		var C = Math.floor((B - 122.1)/365.25);
		var D = Math.floor(365.25 * C);
		var E = Math.floor((B - D)/30.6001);

		var day = B - D - Math.floor(30.6001 * E) + f;
		var month = (E < 14) ? E - 1 : E - 13;
		var year = (month > 2) ? C - 4716 : C - 4715;

		// alert ("date: " + day + "-" + monthList[month-1].name + "-" + year);
		return (day + "-" + monthList[month-1].name + "-" + year);
	}


//***********************************************************************/
//* Name:    calcDayFromJD								*/
//* Type:    Function									*/
//* Purpose: Calendar day (minus year) from Julian Day			*/
//* Arguments:										*/
//*   jd   : Julian Day									*/
//* Return value:										*/
//*   String date in the form DD-MONTH						*/
//***********************************************************************/

	function calcDayFromJD(jd)
	{
		var z = Math.floor(jd + 0.5);
		var f = (jd + 0.5) - z;

		if (z < 2299161) {
			var A = z;
		} else {
			alpha = Math.floor((z - 1867216.25)/36524.25);
			var A = z + 1 + alpha - Math.floor(alpha/4);
		}

		var B = A + 1524;
		var C = Math.floor((B - 122.1)/365.25);
		var D = Math.floor(365.25 * C);
		var E = Math.floor((B - D)/30.6001);

		var day = B - D - Math.floor(30.6001 * E) + f;
		var month = (E < 14) ? E - 1 : E - 13;
		var year = (month > 2) ? C - 4716 : C - 4715;

		return ((day<10 ? "0" : "") + day + monthList[month-1].abbr);
	}

//Save
//***********************************************************************/
//* Name:    calcTimeJulianCent							*/
//* Type:    Function									*/
//* Purpose: convert Julian Day to centuries since J2000.0.			*/
//* Arguments:										*/
//*   jd : the Julian Day to convert						*/
//* Return value:										*/
//*   the T value corresponding to the Julian Day				*/
//***********************************************************************/

	function calcTimeJulianCent(jd)
	{
		var d = (jd - 2451545.0)/36525.0;
		return d;
	}


//***********************************************************************/
//* Name:    calcJDFromJulianCent							*/
//* Type:    Function									*/
//* Purpose: convert centuries since J2000.0 to Julian Day.			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   the Julian Day corresponding to the t value				*/
//***********************************************************************/

	function calcJDFromJulianCent(t)
	{
		var JDay = t * 36525.0 + 2451545.0;
		return JDay;
	}


//***********************************************************************/
//* Name:    calGeomMeanLongSun							*/
//* Type:    Function									*/
//* Purpose: calculate the Geometric Mean Longitude of the Sun		*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   the Geometric Mean Longitude of the Sun in degrees			*/
//***********************************************************************/

	function calcGeomMeanLongSun(t)
	{
		var L0 = 280.46646 + t * (36000.76983 + 0.0003032 * t);
		while(L0 > 360.0)
		{
			L0 -= 360.0;
		}
		while(L0 < 0.0)
		{
			L0 += 360.0;
		}
		return L0;		// in degrees
	}


//***********************************************************************/
//* Name:    calGeomAnomalySun							*/
//* Type:    Function									*/
//* Purpose: calculate the Geometric Mean Anomaly of the Sun		*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   the Geometric Mean Anomaly of the Sun in degrees			*/
//***********************************************************************/

	function calcGeomMeanAnomalySun(t)
	{
		var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
		return M;		// in degrees
	}

//***********************************************************************/
//* Name:    calcEccentricityEarthOrbit						*/
//* Type:    Function									*/
//* Purpose: calculate the eccentricity of earth's orbit			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   the unitless eccentricity							*/
//***********************************************************************/


	function calcEccentricityEarthOrbit(t)
	{
		var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
		return e;		// unitless
	}
//save
//***********************************************************************/
//* Name:    calcSunEqOfCenter							*/
//* Type:    Function									*/
//* Purpose: calculate the equation of center for the sun			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   in degrees										*/
//***********************************************************************/


	function calcSunEqOfCenter(t)
	{
		var m = calcGeomMeanAnomalySun(t);

		var mrad = degToRad(m);
		var sinm = Math.sin(mrad);
		var sin2m = Math.sin(mrad+mrad);
		var sin3m = Math.sin(mrad+mrad+mrad);

		var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
		return C;		// in degrees
	}
//save
//***********************************************************************/
//* Name:    calcSunTrueLong								*/
//* Type:    Function									*/
//* Purpose: calculate the true longitude of the sun				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's true longitude in degrees						*/
//***********************************************************************/


	function calcSunTrueLong(t)
	{
		var l0 = calcGeomMeanLongSun(t);
		var c = calcSunEqOfCenter(t);

		var O = l0 + c;
		return O;		// in degrees
	}

//***********************************************************************/
//* Name:    calcSunTrueAnomaly							*/
//* Type:    Function									*/
//* Purpose: calculate the true anamoly of the sun				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's true anamoly in degrees							*/
//***********************************************************************/

	function calcSunTrueAnomaly(t)
	{
		var m = calcGeomMeanAnomalySun(t);
		var c = calcSunEqOfCenter(t);

		var v = m + c;
		return v;		// in degrees
	}

//***********************************************************************/
//* Name:    calcSunRadVector								*/
//* Type:    Function									*/
//* Purpose: calculate the distance to the sun in AU				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun radius vector in AUs							*/
//***********************************************************************/

	function calcSunRadVector(t)
	{
		var v = calcSunTrueAnomaly(t);
		var e = calcEccentricityEarthOrbit(t);
 
		var R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(degToRad(v)));
		return R;		// in AUs
	}
//save
//***********************************************************************/
//* Name:    calcSunApparentLong							*/
//* Type:    Function									*/
//* Purpose: calculate the apparent longitude of the sun			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's apparent longitude in degrees						*/
//***********************************************************************/

	function calcSunApparentLong(t)
	{
		var o = calcSunTrueLong(t);

		var omega = 125.04 - 1934.136 * t;
		var lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
		return lambda;		// in degrees
	}
//Save
//***********************************************************************/
//* Name:    calcMeanObliquityOfEcliptic						*/
//* Type:    Function									*/
//* Purpose: calculate the mean obliquity of the ecliptic			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   mean obliquity in degrees							*/
//***********************************************************************/

	function calcMeanObliquityOfEcliptic(t)
	{
		var seconds = 21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813)));
		var e0 = 23.0 + (26.0 + (seconds/60.0))/60.0;
		return e0;		// in degrees
	}
//save
//***********************************************************************/
//* Name:    calcObliquityCorrection						*/
//* Type:    Function									*/
//* Purpose: calculate the corrected obliquity of the ecliptic		*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   corrected obliquity in degrees						*/
//***********************************************************************/

	function calcObliquityCorrection(t)
	{
		var e0 = calcMeanObliquityOfEcliptic(t);

		var omega = 125.04 - 1934.136 * t;
		var e = e0 + 0.00256 * Math.cos(degToRad(omega));
		return e;		// in degrees
	}

//***********************************************************************/
//* Name:    calcSunRtAscension							*/
//* Type:    Function									*/
//* Purpose: calculate the right ascension of the sun				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's right ascension in degrees						*/
//***********************************************************************/

	function calcSunRtAscension(t)
	{
		var e = calcObliquityCorrection(t);
		var lambda = calcSunApparentLong(t);
 
		var tananum = (Math.cos(degToRad(e)) * Math.sin(degToRad(lambda)));
		var tanadenom = (Math.cos(degToRad(lambda)));
		var alpha = radToDeg(Math.atan2(tananum, tanadenom));
		return alpha;		// in degrees
	}
//save
//***********************************************************************/
//* Name:    calcSunDeclination							*/
//* Type:    Function									*/
//* Purpose: calculate the declination of the sun				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's declination in degrees							*/
//***********************************************************************/

	function calcSunDeclination(t)
	{
		var e = calcObliquityCorrection(t);
		var lambda = calcSunApparentLong(t);

		var sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
		var theta = radToDeg(Math.asin(sint));
		return theta;		// in degrees
	}
//save
//***********************************************************************/
//* Name:    calcEquationOfTime							*/
//* Type:    Function									*/
//* Purpose: calculate the difference between true solar time and mean	*/
//*		solar time									*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   equation of time in minutes of time						*/
//***********************************************************************/

	function calcEquationOfTime(t)
	{
		var epsilon = calcObliquityCorrection(t);
		var l0 = calcGeomMeanLongSun(t);
		var e = calcEccentricityEarthOrbit(t);
		var m = calcGeomMeanAnomalySun(t);

		var y = Math.tan(degToRad(epsilon)/2.0);
		y *= y;

		var sin2l0 = Math.sin(2.0 * degToRad(l0));
		var sinm   = Math.sin(degToRad(m));
		var cos2l0 = Math.cos(2.0 * degToRad(l0));
		var sin4l0 = Math.sin(4.0 * degToRad(l0));
		var sin2m  = Math.sin(2.0 * degToRad(m));

		var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0
				- 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;

		return radToDeg(Etime)*4.0;	// in minutes of time
	}
//save
//***********************************************************************/
//* Name:    calcHourAngleSunrise							*/
//* Type:    Function									*/
//* Purpose: calculate the hour angle of the sun at sunrise for the	*/
//*			latitude								*/
//* Arguments:										*/
//*   lat : latitude of observer in degrees					*/
//*	solarDec : declination angle of sun in degrees				*/
//* Return value:										*/
//*   hour angle of sunrise in radians						*/
//***********************************************************************/

	function calcHourAngleSunrise(lat, solarDec)
	{
		var latRad = degToRad(lat);
		var sdRad  = degToRad(solarDec)

		var HAarg = (Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));

		var HA = (Math.acos(Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad)));

		return HA;		// in radians
	}

//***********************************************************************/
//* Name:    calcHourAngleSunset							*/
//* Type:    Function									*/
//* Purpose: calculate the hour angle of the sun at sunset for the	*/
//*			latitude								*/
//* Arguments:										*/
//*   lat : latitude of observer in degrees					*/
//*	solarDec : declination angle of sun in degrees				*/
//* Return value:										*/
//*   hour angle of sunset in radians						*/
//***********************************************************************/

	function calcHourAngleSunset(lat, solarDec)
	{
		var latRad = degToRad(lat);
		var sdRad  = degToRad(solarDec)

		var HAarg = (Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));

		var HA = (Math.acos(Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad)));

		return -HA;		// in radians
	}


//***********************************************************************/
//* Name:    calcSunriseUTC								*/
//* Type:    Function									*/
//* Purpose: calculate the Universal Coordinated Time (UTC) of sunrise	*/
//*			for the given day at the given location on earth	*/
//* Arguments:										*/
//*   JDay  : julian day									*/
//*   latitude : latitude of observer in degrees				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   time in minutes from zero Z							*/
//***********************************************************************/

	
	function calcSunriseUTC(JD, latitude, longitude)
	{
		var t = calcTimeJulianCent(JD);

		// *** Find the time of solar noon at the location, and use
        //     that declination. This is better than start of the 
        //     Julian day

		var noonmin = calcSolNoonUTC(t, longitude);
		var tnoon = calcTimeJulianCent (JD+noonmin/1440.0);

		// *** First pass to approximate sunrise (using solar noon)

		var eqTime = calcEquationOfTime(tnoon);
		var solarDec = calcSunDeclination(tnoon);
		var hourAngle = calcHourAngleSunrise(latitude, solarDec);

		var delta = longitude - radToDeg(hourAngle);
		var timeDiff = 4 * delta;	// in minutes of time
		var timeUTC = 720 + timeDiff - eqTime;	// in minutes

		// alert("eqTime = " + eqTime + "\nsolarDec = " + solarDec + "\ntimeUTC = " + timeUTC);

		// *** Second pass includes fractional jday in gamma calc

		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + timeUTC/1440.0); 
		eqTime = calcEquationOfTime(newt);
		solarDec = calcSunDeclination(newt);
		hourAngle = calcHourAngleSunrise(latitude, solarDec);
		delta = longitude - radToDeg(hourAngle);
		timeDiff = 4 * delta;
		timeUTC = 720 + timeDiff - eqTime; // in minutes

		// alert("eqTime = " + eqTime + "\nsolarDec = " + solarDec + "\ntimeUTC = " + timeUTC);

		return timeUTC;
	}
//save
//***********************************************************************/
//* Name:    calcSolNoonUTC								*/
//* Type:    Function									*/
//* Purpose: calculate the Universal Coordinated Time (UTC) of solar	*/
//*		noon for the given day at the given location on earth		*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   time in minutes from zero Z							*/
//***********************************************************************/

	function calcSolNoonUTC(t, longitude)
	{
		// First pass uses approximate solar noon to calculate eqtime
		var tnoon = calcTimeJulianCent(calcJDFromJulianCent(t) + longitude/360.0);
		var eqTime = calcEquationOfTime(tnoon);
		var solNoonUTC = 720 + (longitude * 4) - eqTime; // min

		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) -0.5 + solNoonUTC/1440.0); 

		eqTime = calcEquationOfTime(newt);
		// var solarNoonDec = calcSunDeclination(newt);
		solNoonUTC = 720 + (longitude * 4) - eqTime; // min
		
		return solNoonUTC;
	}

//***********************************************************************/
//* Name:    calcSunsetUTC								*/
//* Type:    Function									*/
//* Purpose: calculate the Universal Coordinated Time (UTC) of sunset	*/
//*			for the given day at the given location on earth	*/
//* Arguments:										*/
//*   JDay  : julian day									*/
//*   latitude : latitude of observer in degrees				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   time in minutes from zero Z							*/
//***********************************************************************/

	function calcSunsetUTC(JDay, latitude, longitude)
	{
		var t = calcTimeJulianCent(JDay);

		// *** Find the time of solar noon at the location, and use
        //     that declination. This is better than start of the 
        //     Julian day

		var noonmin = calcSolNoonUTC(t, longitude);
		var tnoon = calcTimeJulianCent (JDay+noonmin/1440.0);

		// First calculates sunrise and approx length of day

		var eqTime = calcEquationOfTime(tnoon);
		var solarDec = calcSunDeclination(tnoon);
		var hourAngle = calcHourAngleSunset(latitude, solarDec);

		var delta = longitude - radToDeg(hourAngle);
		var timeDiff = 4 * delta;
		var timeUTC = 720 + timeDiff - eqTime;

		// first pass used to include fractional day in gamma calc

		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + timeUTC/1440.0); 
		eqTime = calcEquationOfTime(newt);
		solarDec = calcSunDeclination(newt);
		hourAngle = calcHourAngleSunset(latitude, solarDec);

		delta = longitude - radToDeg(hourAngle);
		timeDiff = 4 * delta;
		timeUTC = 720 + timeDiff - eqTime; // in minutes

		return timeUTC;
	}


//*********************************************************************/
//Save
// Returns the decimal latitude from the degrees, minutes and seconds entered 
// into the form	

	function getLatitude(zip)
	{
		// find latitude based on zip
	}	

//Save
//*********************************************************************/

// Returns the decimal longitude from the degrees, minutes and seconds entered 
// into the form	

	function getLongitude(zip)
	{
		// find longitude based of zip
	}	

	
//***********************************************************************/
//* Name:    calcSun									*/
//* Type:    Main Function called by form controls				*/
//* Purpose: calculate time of sunrise and sunset for the entered date	*/
//*		and location.*/
//* Arguments:										*/
//*  month
//   day
//   year
//	zip: to find latitude or longitude
// sunrise: bool if sunrise(true) or sunset(false)
//* Return value:										*/
//*   none											*/
//*	(fills riseSetForm text fields with results of calculations)	*/
//***********************************************************************/

	function calcSun(month, day, year, zip,	sunrise,latitude, longitude) 
	{
		//var latitude = getLatitude(zip);
		//var longitude = getLongitude(zip);
		//Not sure what this variable is, but it is currently undefined
		//var indexRS = riseSetForm.mos.selectedIndex

			if((latitude >= -90) && (latitude < -89))
			{
				alert("All latitudes between 89 and 90 S\n will be set to -89");
				latitude = -89;
			}
			if ((latitude <= 90) && (latitude > 89))
			{
				alert("All latitudes between 89 and 90 N\n will be set to 89");
				latitude = 89;
			}
			
			//var JDay = JD(parseFloat(year.value), parseFloat(month.value), parseFloat(day.value));
			var JDay = JD(year, month, day);
			
			
			//***********************************************************************/
//* Name:    timeStringShortAMPM							*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded string	*/
//*		suitable for printing to the form text fields.  If time	*/
//*		crosses a day boundary, date is appended.				*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//*   JD  : julian day									*/
//* Return value:										*/
//*   string of the format HH:MM[AM/PM] (DDMon)					*/
//***********************************************************************/

// timeStringShortAMPM returns a zero-padded string (HH:MM *M) given time in 
// minutes and appends short date if time is > 24 or < 0, resp.

	function timeStringShortAMPM(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60.0;
		var hour = Math.floor(floatHour);
		var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec + 0.5);
		var PM = false;

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		var daychange = false;
		if (hour > 23) 
		{
			hour -= 24;
			daychange = true;
			julianday += 1.0;
		}

		if (hour < 0)
		{
			hour += 24;
			daychange = true;
			julianday -= 1.0;
		}

		if (hour > 12)
		{
			hour -= 12;
			PM = true;
		}

            if (hour == 12)
		{
              PM = true;
            }

		if (hour == 0)
		{
			PM = false;
			hour = 12;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ((PM)?"PM":"AM");
		else
			timeStr += "" + minute + ((PM)?"PM":"AM");

		if (daychange) return timeStr + " " + calcDayFromJD(julianday);
		return timeStr;
	}
		function isDaylight(month, day){
			
			if(month ==3){
				if(day >= 9) return 60;
				
			}
			else if(month >3 && month <=11)
			{
				if (month == 11 && day < 1) return 0;
				else return 60;
					
				
			}				
			
			else return 0;
			
			
		}
		
		function zones(zip){
			
			if(zip >98000)
				return 10;
			else if(zip >= 96700 && zip<= 96899)
				return 9;
			else if(zip >= 89999)
				return 8;
			else if(zip >= 80000 || (zip >= 57500 && zip <= 59899) )
				 return 7;
			else if (zip>= 35999)
				return 6;
			else 
				return 5;
			
			
			
			
			
		}
//*********************************************************************/
		var daylight = isDaylight(month,day,year);
		var zone = zones(zip);
			if(sunrise == true){
				var riseTimeGMT = calcSunriseUTC(JDay, latitude, (-1)*longitude);
				var riseTimeLST = riseTimeGMT - (60 * zone) + daylight;
				var riseStr = timeStringShortAMPM(riseTimeLST, JD);
				riseTimeGMT = riseStr;
				return riseTimeGMT;
			}
			else{
				var setTimeGMT = calcSunsetUTC(JDay, latitude, longitude);
				var setTimeLST = setTimeGMT - (60 * zone) + daylight;
				var setStr = timeStringShortAMPM(setTimeLST, JD);
				return setStr;
			}
	}



//*********************************************************************/
