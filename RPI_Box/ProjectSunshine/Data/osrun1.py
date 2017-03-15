#!/usr/bin/env python

#only one program at the time

import os
import time

time.sleep(10)
os.system("javac /home/pi/RCU/program.java")     

# 
#

while True:
    time.sleep(1)
    os.system("java -cp /home/pi/RCU/ program") 
       
    #os.system("echo 'End program'")
