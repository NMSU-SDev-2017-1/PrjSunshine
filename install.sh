#!/bin/bash
# install.sh
# This is a bash script that will install any dependencies,
# modify and required files, and move others to their necessary location
# March, 2017
# Brian O'Dell Project Sunshine

#sed example
#sed -e '/# TEST INFO/{r temp.txt' -e 'd}' -i.bak init.txt
#/# TEST INFO/ is the regex being matched
#temp.txt is the file where the output is coming from
#-i.bak makes a .bak file for backup
#init.txt is the file sed is going through
#
#mv init.txt.bak init.txt
#makes init.txt be the original .bak file saved before
#
# if grep -Fxq "# TEST INFO" init.txt
# then
#     sed -e '/# TEST INFO/{r temp.txt' -e 'd}' -i.bak init.txt
# else
#     #appends the string to init.txt
#     echo "# TEST INFO">>init.txt
#     sed -e '/# TEST INFO/{r temp.txt' -e 'd}' -i.bak init.txt
# fi
#
# edit one line
# sed -i '/### BEGIN INIT INFO/c\BEGIN' init.txt
#
# delete lines between a pattern
# sed -i '/# TEST INFO/,/# TEST INFO/d' init.txt
#
#the above is an example of how the script will modify the files

VERBOSE=0
UNINSTALL=0
FILESONLY=0
NOBACKUP=0
HELP=0
RESTORE=0
#parse through passed arguments and set values accordingly
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -v|--verbose)
    VERBOSE=1
    ;;
    -u|--uninstall)
    UNINSTALL=1
    ;;
    -f|--filesonly)
    FILESONLY=1
    ;;
    -n|--nobackup)
    NOBACKUP=1
    ;;
    -h|--help)
    HELP=1
    ;;
    -r|--restore)
    RESTORE=1
    ;;
    *)
    HELP=1        # unknown option
    ;;
esac
shift # past argument or value
done #finished with arguments

function showhelp() {
    echo "Unrecognized argument or help selected"
    echo "-v, --verbose    for detailed messages"
    echo
    echo "-u, --uninstall  to uninstall"
    echo
    echo "-f, --filesonly  to only update the server files without"
    echo "                 installing the server programs"
    echo
    echo "-n, --nobackup   to skip the backup routine,"
    echo "                 this should be used every time the program"
    echo "                 is run except for the first time"
    echo
    echo "-r, --restore    restores configs from backup"
    echo
    echo "-h, --help       to see this message"
    echo " If -u and -f are used together, then the background programs will"
    echo " not be uninstalled, only the files will be reverted"
    echo " backups located at /opt/sunshine/backups"
    quit
}

function quit() {
    exit
}

#restoreFiles will restore the configurations made at the initial setup
function restoreFiles() {
    cp /opt/sunshine/backups/dhcpd.conf.backup /etc/dhcp/dhcpd.conf
    cp /opt/sunshine/backups/isc-dhcp-server.backup /etc/default/isc-dhcp-server
    cp /opt/sunshine/backups/interfaces.backup /etc/network/interfaces
    cp /opt/sunshine/backups/hostapd.conf.backup /etc/hostapd/hostapd.conf
    cp /opt/sunshine/backups/hostapd.backup /etc/default/hostapd
    cp /opt/sunshine/backups/hostapd.initd.backup /etc/init.d/hostapd
    cp /opt/sunshine/backups/sysctl.conf.backup /etc/sysctl.conf
    quit
}
#function that will undo all changes made by the script
function undoInstall() {

    if [ $VERBOSE = "1" ]; then
        echo "Resetting interfaces"
    fi
    cp /opt/sunshine/backups/dhcpd.conf.backup /etc/dhcp/dhcpd.conf

    if [ $VERBOSE = "1" ]; then
        echo "Resetting /etc/dhcp/dhcpd.conf"
    fi
    sed -i '/#option domain-name "example.org";/c\option domain-name "example.org";' /etc/dhcp/dhcpd.conf
    sed -i '/#option domain-name-servers ns1.example.org, ns2.example.org;/c\option domain-name-servers ns1.example.org, ns2.example.org;' /etc/dhcp/dhcpd.conf
    sed -i '/authoritative;/c\#authoritative;' /etc/dhcp/dhcpd.conf
    sed -i '/#DHCP ADD/,/#DHCP ADD/d' /etc/dhcp/dhcpd.conf

    if [ $VERBOSE = "1" ]; then
        echo "Resetting /etc/default/isc-dhcp-server"
    fi
    sed -i 'DHCPD_CONF=/etc/dhcp/dhcpd.conf/c\#DHCPD_CONF=/etc/dhcp/dhcpd.conf' /etc/default/isc-dhcp-server
    sed -i '/INTERFACES="wlan0"/c\INTERFACES=""' /etc/default/isc-dhcp-server
    service isc-dhcp-server stop

    if [ $VERBOSE = "1" ]; then
        echo "Resetting /etc/hostapd/hostapd.conf"
    fi
    sed -i '/#HOSTAPD ADD/,/#HOSTAPD ADD/d' /etc/hostapd/hostapd.conf

    if [ $VERBOSE = "1" ]; then
        echo "Resetting /etc/default/hostapd"
    fi
    sed -i '/DAEMON_CONF="/etc/hostapd/hostapd.conf"/c\#DAEMON_CONF=""' /etc/default/hostapd

    if [ $VERBOSE = "1" ]; then
        echo "Resetting /etc/init.d/hostapd"
    fi
    sed -i '/DAEMON_CONF=/etc/hostapd/hostapd.conf/c\DAEMON_CONF=' /etc/init.d/hostapd

    if [ $VERBOSE = "1" ]; then
        echo "Resetting /etc/sysctl.conf"
    fi
    sed -i '/net.ipv4.ip_forward=1/c\#net.ipv4.ip_forward=1' /etc/sysctl.conf

    if [ $VERBOSE = "1" ]; then
        echo "Resetting daemons and settings"
    fi
    ifup wlan0
    ifconfig wlan0 DHCP
    service hostapd stop
    service isc-dhcp-server stop
    update-rc.d hostapd disable
    update-rc.d isc-dhcp-server disable

    cd /var/www/html
    rm -r *

#if set, then only the files will be changed the underlying programs
#wont be uninstalled
if [ $FILESONLY = "0" ]; then
    apt-get remove iptables-persistent
    apt-get remove hostapd isc-dhcp-server
    apt-get remove apache2 php5
fi
    quit
}

function copyfiles() {
    #checks current values before rewriting files
    if [ $VERBOSE = "1" ]; then
        echo "copying files to apache directory"
    fi
    if grep -Fxq "backupdone=1" /var/www/html/INSTALL/config.sun
    then
        backupdone=1
    fi
    if grep -Fxq "installed=1" /var/www/html/INSTALL/config.sun
    then
        installed=1
    fi
    rsync -r $fileloc/ /var/www/html
    cd /var/www/html
    rm -r .git
    rm .gitignore
    cd RPI
    g++ cam.cpp -std=c++11 -o cam
    g++ blackboard.cpp -std=c++11 -o blackboard
    cd ..

    #rewrites values based on previous actions
    if [ $backupdone = "1" ]; then
        sed -i '/backupdone=0/c\backupdone=1' /var/www/html/INSTALL/config.sun
    fi
    if [ $installed = "1" ]; then
        sed -i '/installed=0/c\installed=1' /var/www/html/INSTALL/config.sun
    fi

    return
}

fileloc=$(pwd)

#if help or unrecognized command
if [ $HELP = "1" ]; then
    showhelp
fi

if [ $RESTORE = "1" ];then
    restoreFiles
fi

#Ensure backup files are not overwritten
if grep -Fxq "backupdone=1" /var/www/html/INSTALL/config.sun
then
    NOBACKUP=1
fi

#do not do all reinstall acitons if it already completed successfully
if grep -Fxq "installed=1" /var/www/html/INSTALL/config.sun
then
    FILESONLY=1
fi

#if uninstall flag was set run function uninstall
if [ $UNINSTALL = "1" ]; then
    undoInstall 1

#otherwise do install activities
else
    if [ $FILESONLY = "1" ]; then
        copyfiles
        quit
    fi


    #we will copy the files we modify to a directory that is far out of the
    #way. that way we can revert changes later. update first to ensure
    #we have the headers for the new packages
    if [ $VERBOSE = "1" ]; then
        echo "installing dependencies"
    fi
    cd /
    apt-get update
    apt-get install iptables-persistent
    apt-get install hostapd isc-dhcp-server
    apt-get install php5

    copyfiles
#Backs up the files we are using if it wasnt otherwise specified
    if [ $NOBACKUP = "0" ]; then
        if [ $VERBOSE = "1" ]; then
            echo "backing up files"
            echo "located at /opt/sunshine/backups"
        fi
        mkdir /opt/sunshine
        mkdir /opt/sunshine/backups
        cp /etc/dhcp/dhcpd.conf /opt/sunshine/backups/dhcpd.conf.backup
        cp /etc/default/isc-dhcp-server /opt/sunshine/backups/isc-dhcp-server.backup
        cp /etc/network/interfaces /opt/sunshine/backups/interfaces.backup
        cp /etc/hostapd/hostapd.conf /opt/sunshine/backups/hostapd.conf.backup
        cp /etc/default/hostapd /opt/sunshine/backups/hostapd.backup
        cp /etc/init.d/hostapd /opt/sunshine/backups/hostapd.initd.backup
        cp /etc/sysctl.conf /opt/sunshine/backups/sysctl.conf.backup
        sed -i '/backupdone=0/c\backupdone=1' /var/www/html/INSTALL/config.sun
    fi

#Editing the interfaces file
    if [ $VERBOSE = "1" ]; then
        echo "Editing interfaces file"
    fi
    if grep -Fxq "#INTERFACE ADD" /etc/network/interfaces
    then
        echo "done"
    else
        echo "#INTERFACE ADD">>/etc/network/interfaces
        sed -e '/#INTERFACE ADD/{r /var/www/html/INSTALL/interfaceadd.sun' -e 'd}' -i.bak /etc/network/interfaces
    fi

#Editing of /etc/dhcp/dhcpd.conf file
    if [ $VERBOSE = "1" ]; then
        echo "Editing /etc/dhcp/dhcpd.conf"
    fi
    if grep -Fxq "DHCP ADD" /etc/dhcp/dhcpd.conf
    then
        echo "done"
    else
        sed -i '/option domain-name "example.org";/c\#option domain-name "example.org";' /etc/dhcp/dhcpd.conf
        sed -i '/option domain-name-servers ns1.example.org, ns2.example.org;/c\#option domain-name-servers ns1.example.org, ns2.example.org;' /etc/dhcp/dhcpd.conf
        sed -i '/#authoritative;/c\authoritative;' /etc/dhcp/dhcpd.conf
        echo "#DHCP ADD">>/etc/dhcp/dhcpd.conf
        sed -e '/#DHCP ADD/{r /var/www/html/INSTALL/dhcpadd.sun' -e 'd}' -i.bak /etc/dhcp/dhcpd.conf
    fi

#Editing /etc/default/isc-dhcp-server
    if [ $VERBOSE = "1" ]; then
        echo "Editing /etc/default/isc-dhcp-server"
    fi
    sed -i '#DHCPD_CONF=/etc/dhcp/dhcpd.conf/c\DHCPD_CONF=/etc/dhcp/dhcpd.conf' /etc/default/isc-dhcp-server
    sed -i '/INTERFACES=""/c\INTERFACES="wlan0"' /etc/default/isc-dhcp-server
    service isc-dhcp-server restart

#Editing /etc/hostapd/hostapd.conf
    if [ $VERBOSE = "1" ]; then
        echo "Editing /etc/hostapd/hostapd.conf"
    fi
    if grep -Fxq "#HOSTAPD ADD" /etc/hostapd/hostapd.conf
    then
        echo "done"
    else
    echo "#HOSTAPD ADD">>/etc/hostapd/hostapd.conf
    sed -e '/#HOSTAPD ADD/{r /var/www/html/INSTALL/hostapdadd.sun' -e 'd}' -i.bak /etc/hostapd/hostapd.conf
    fi

#Editing /etc/default/hostapd
    if [ $VERBOSE = "1" ]; then
        echo "Editing /etc/default/hostapd"
    fi
    sed -i '/#DAEMON_CONF=""/c\DAEMON_CONF="/etc/hostapd/hostapd.conf"' /etc/default/hostapd

#Editing /etc/init.d/hostapd
    if [ $VERBOSE = "1" ]; then
        echo "Editing /etc/init.d/hostapd"
    fi
    sed -i '/DAEMON_CONF=/c\DAEMON_CONF=/etc/hostapd/hostapd.conf' /etc/init.d/hostapd

#Editing /etc/sysctl.conf and forwarding wireless connection to ethernet
    if [ $VERBOSE = "1" ]; then
        echo "Editing /etc/sysctl.conf forwarding wireless connection to ethernet"
    fi
    sed -i '/#net.ipv4.ip_forward=1/c\net.ipv4.ip_forward=1' /etc/sysctl.conf
    sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
    iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
    iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
    iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
    sh -c "iptables-save > /etc/iptables/rules.v4"

#Start and setup the daemon so it runs at boot
    if [ $VERBOSE = "1" ]; then
        echo "start and setup daemon so it runs at boot"
    fi
    ifdown wlan0
    ifconfig wlan0 192.168.42.1
    /usr/sbin/hostapd /etc/hostapd/hostapd.conf
    service hostapd start
    service isc-dhcp-server start

    update-rc.d hostapd enable
    update-rc.d isc-dhcp-server enable

    if [ $VERBOSE = "1" ]; then
        echo "setting flag indicating install was successful"
    fi
    sed -i '/installed=0/c\installed=1' /var/www/html/INSTALL/config.sun
fi
