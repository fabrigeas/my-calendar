#/!/bisn/bash

#This script will run on aws
#This script is used for deployment purposes and does the following on aws
# pull changes
# install dependencies
# restart server

set -e

cd my-calendar/
git pull origin master

cd backend
npm install
npm audit fix

cd ../frontnend
npm install
npm audit fix

pm2
