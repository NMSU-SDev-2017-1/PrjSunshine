import java.lang.Math;

public class sun{
int monthD[]= {31,59,90,120,151,181,212,243,273,304,334,365};
int code;
int day;
int month;
int year;
double la;
boolean rise;
int n;
int lam;
int mod;
sun(int zip, int d, int m, int y, boolean sunrise){

 code = zip;
 day = d;
 month = m;
 year = y;
 rise = sunrise;
}
public int calculate(){
 double j = julian();
 double d = hourA();
 double hour = 2451545 + 0.0009 + ((d + la )/360) + n;
 int set = hour + (0.0053 * Math.sin(mod)) - (0.0069 * Math.sin(2 * lam));
 if (sunrise == true) set = j -(set -j);
 
}

// calculates the day from the julian year which is january 1, 2000
private int julianDay(){

Will use 1999 because it is from 2000 But it wont include the full current year in calculations.
int pass = year - 1999;
int leap = pass/3;
int ydays = (pass *365) +pass;

// calulates days from beginning of the month.
// subtracts 2 one for the appropriate palce in the array and the other since the current month is not complete.
int myear = monthD{month-2};

// checks for leap year
if(pass%4 =0 && (month-2) > 1) myear = myear + 1;


int current = myear + day + ydays

int jday = (2451545) * current;

return jday;
}

private double julian(){
	
	int day = julianDay();
	double L = intcalcLo();
	n = (int)(day - 2451545 - 0.0009) - (L/360);
	double j = (double)(2451545 + 0.0009 +( L/360) + n;
	mod = (357.5291 + .98560028 * (j -2451545))%360; 
	double center = (1.9148 * Math.sin(mod)) + (0.0200 * Math.sin(2 * mod)) + (0.0003 * Math.sin(3 * mod));
	lam = (mod + 102.9372 + center + 180) % 360;
	double jf = j +(0.0053 * Math.sin(mod)) - (0.0069 * Math.sin(2 * lam));
	
	return jf;
	
}

private double hourA(){
	double anglehour = arcMath.sin( Math.sin(lam) * Math.sin(23.45));
	double la = calcLa();
	double H = arccos( [Math.sin(-0.83) - Math.sin(la) * Math.sin(anglehour)] / [cos(la) * cos(anglehour)] )
	
	return H;
	
}
private double calcLo(){;
	// find from file
double Lo = // search//;

return Lo;

}
private double calcLa(){
	
	// find from file
double La = // search//;
return La;

}











}