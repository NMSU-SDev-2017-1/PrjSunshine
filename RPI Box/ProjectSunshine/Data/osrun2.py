#!/usr/bin/env python

#only one program at the time

import os
import time

time.sleep(10)

while True:
    time.sleep(1)
    os.system("sudo /home/pi/RCU/rcu")
