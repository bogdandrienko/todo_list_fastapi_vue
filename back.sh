cd bakend_fastapi
# sudo apt-get update -y
# sudo apt-get upgrade -y
# sudo apt-get install -y python3-pip python3-venv
# sudo pip3 install --upgrade pip
# python3 -m venv env
source env/bin/activate
# pip install --upgrade pip
# pip install "fastapi[all]" # pip install fastapi uvicorn
# pip freeze > requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
