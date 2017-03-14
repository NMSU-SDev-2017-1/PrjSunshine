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
    echo "-h, --help       to see this message"
    quit
}

function quit() {
    exit
}

#function that will undo all changes made by the script
function undoInstall() {
    #future implementation will allow user to decide if they only
    #want to change files, or remove installed packages also

    cp /opt/sunshine/backups/dhcpd.conf.backup /etc/dhcp/dhcpd.conf
    cp /opt/sunshine/backups/isc-dhcp-server.backup /etc/default/isc-dhcp-server
    cp /opt/sunshine/backups/interfaces.backup /etc/network/interfaces
    cp /opt/sunshine/backups/hostapd.conf.backup /etc/hostapd/hostapd.conf
    cp /opt/sunshine/backups/hostapd.backup /etc/default/hostapd
    cp /opt/sunshine/backups/hostapd.initd.backup /etc/init.d/hostapd
    cp /opt/sunshine/backups/sysctl.conf.backup /etc/sysctl.conf

    cd /var/www/html
    rm -r *

    apt-get remove iptables-persistent
    apt-get remove hostapd isc-dhcp-server
    apt-get remove apache2 php5
    quit
}

function copyfiles() {
    echo "copying files to apache directory"
    rsync -r $fileloc/ /var/www/html
    cd /var/www/html
    rm -r .git
    rm .gitignore
    return
}

fileloc=$(pwd)

#if help or unrecognized command
if [ $HELP = "1" ]; then
    showhelp
fi

#Ensure backup files are not overwritten
if grep -Fxq "backupdone=1" /var/www/html/Install/config.sun
then
    NOBACKUP=1
fi

#do not do all reinstall acitons if it already completed successfully
if grep -Fxq "installed=1" /var/www/html/Install/config.sun
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
    echo "installing dependencies"
    cd /
    apt-get update
    apt-get install iptables-persistent
    apt-get install hostapd isc-dhcp-server
    apt-get install php5

    copyfiles
#Backs up the files we are using if it wasnt otherwise specified
    if [ $NOBACKUP = "0" ]; then
        echo "backing up files"
        mkdir /opt/sunshine
        mkdir /opt/sunshine/backups
        cp /etc/dhcp/dhcpd.conf /opt/sunshine/backups/dhcpd.conf.backup
        cp /etc/default/isc-dhcp-server /opt/sunshine/backups/isc-dhcp-server.backup
        cp /etc/network/interfaces /opt/sunshine/backups/interfaces.backup
        cp /etc/hostapd/hostapd.conf /opt/sunshine/backups/hostapd.conf.backup
        cp /etc/default/hostapd /opt/sunshine/backups/hostapd.backup
        cp /etc/init.d/hostapd /opt/sunshine/backups/hostapd.initd.backup
        cp /etc/sysctl.conf /opt/sunshine/backups/sysctl.conf.backup
        sed -i '/backupdone=0/c\backupdone=1' /var/www/html/Install/config.sun
    fi

#Editing the interfaces file
    echo "Editing interfaces file"
    echo "#INTERFACE ADD">>/etc/network/interfaces
    sed -e '/#INTERFACE ADD/{r /var/www/html/Install/interfaceadd.sun' -e 'd}' -i.bak /etc/network/interfaces

#Editing of /etc/dhcp/dhcpd.conf file
    echo "Editing /etc/dhcp/dhcpd.conf"
    sed -i '/option domain-name "example.org";/c\#option domain-name "example.org";' /etc/dhcp/dhcpd.conf
    sed -i '/option domain-name-servers ns1.example.org, ns2.example.org;/c\#option domain-name-servers ns1.example.org, ns2.example.org;' /etc/dhcp/dhcpd.conf
    sed -i '/#authoritative;/c\authoritative;' /etc/dhcp/dhcpd.conf
    echo "#DHCP ADD">>/etc/dhcp/dhcpd.conf
    sed -e '/#DHCP ADD/{r /var/www/html/Install/dhcpadd.sun' -e 'd}' -i.bak /etc/dhcp/dhcpd.conf

#Editing /etc/default/isc-dhcp-server
    echo "Editing /etc/default/isc-dhcp-server"
    sed -i '#DHCPD_CONF=/etc/dhcp/dhcpd.conf/c\DHCPD_CONF=/etc/dhcp/dhcpd.conf' /etc/default/isc-dhcp-server
    sed -i '/INTERFACES=""/c\INTERFACES="wlan0"' /etc/default/isc-dhcp-server
    service isc-dhcp-server restart

#Editing /etc/hostapd/hostapd.conf
    echo "Editing /etc/hostapd/hostapd.conf"
    echo "#HOSTAPD ADD">>/etc/hostapd/hostapd.conf
    sed -e '/#HOSTAPD ADD/{r /var/www/html/Install/hostapdadd.sun' -e 'd}' -i.bak /etc/hostapd/hostapd.conf

#Editing /etc/default/hostapd
    echo "Editing /etc/default/hostapd"
    sed -i '/#DAEMON_CONF=""/c\DAEMON_CONF="/etc/hostapd/hostapd.conf"' /etc/default/hostapd

#Editing /etc/init.d/hostapd
    echo "Editing /etc/init.d/hostapd"
    sed -i '/DAEMON_CONF=/c\DAEMON_CONF=/etc/hostapd/hostapd.conf'

#Editing /etc/sysctl.conf and forwarding wireless connection to ethernet
    echo "Editing /etc/sysctl.conf forwarding wireless connection to ethernet"
    sed -i '/#net.ipv4.ip_forward=1/c\net.ipv4.ip_forward=1' /etc/sysctl.conf
    sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
    iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
    iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
    iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
    sh -c "iptables-save > /etc/iptables/rules.v4"

#Start and setup the daemon so it runs at boot
    echo "start and setup daemon so it runs at boot"
    ifdown wlan0
    ifconfig wlan0 192.168.42.1
    service hostapd start
    service isc-dhcp-server start

    update-rc.d hostapd enable
    update-rc.d isc-dhcp-server enable

    echo "setting flag indicating install was successful"
    sed -i '/installed=0/c\installed=1' /var/www/html/Install/config.sun
fi
