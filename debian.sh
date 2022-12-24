su
apt install sudo
nano /etc/sudoers

su debian

sudo nano /etc/apt/sources.list
# /etc/apt/sources.list
# <file>
deb http://deb.debian.org/debian bullseye main
deb-src http://deb.debian.org/debian bullseye main
deb http://http.us.debian.org/debian/ testing non-free contrib main
# </file>



sudo apt update -y && sudo apt upgrade -y
sudo apt install -y curl build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev
sudo apt-get update -y





sudo apt install nodejs -y

sudo apt install python3.10 -y
sudo apt-get install python3-venv -y
sudo apt install openssh-server docker-compose virtualbox virtualbox-ext-pack python3-dev python3-pip python3-venv -y
sudo systemctl start ssh && sudo systemctl restart ssh

ip a

# python3
wget https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz
tar -xvf Python-3.10.7.tgz && cd Python-3.10.7 && sudo ./configure --enable-optimizations
sudo make -j 4 && sudo make altinstall && python3 --version
# python3

# node js
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm ls-remote
nvm install 18.10.0
nvm use 18.10.0
# node js