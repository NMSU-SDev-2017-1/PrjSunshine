#!/usr/bin/env python

#only one program at the time

import os
import time

time.sleep(1)

while True:
    time.sleep(1)
    os.system("sudo /var/www/html/RPI/cam")
