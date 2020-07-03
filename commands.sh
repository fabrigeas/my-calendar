#/!/bin/bash

#abort immediately if any command fails
set -e

# installs dependencies for both fronend and backend
install() {
  cd backend
  npm install
  npm audit fix

  cd ../frontend
  npm install
  npm audit fix
}

# start the backend
startBackend() {
  cd backend
  npm run watch &
}

# start the frontend
startFrontend() {
  cd ../frontend
  npm run serve
}

# deploy your changes
# - build the fronend
# - the backend does not need to be built
# - push to remote repository
# - connect to aws through ssh
# - from aws pull everithing
# - restart the server
deploy() {
  cd frontend
  git commit -am "deploying"
  npm run build
  cp -r dist/ ../backend/public/

  cd ../backend
  git add public/dist
  git commit -am "deploying"

  cd -

  git push origin master

  # run the deploy script remotely
  ssh -i "aws-instance-keypair-2.pem" ec2-user@ec2-54-93-50-24.eu-central-1.compute.amazonaws.com "my-calendar/deploy.sh"

  printf "\x1b[32mDeployment complete!!
  Visit http://54.93.50.24:3002/"

}

# Starts both the fronend and backend
start() {
  startBackend && startFrontend
}

##

awsConnect() {
  ssh -i "aws-instance-keypair-2.pem" ec2-user@ec2-54-93-50-24.eu-central-1.compute.amazonaws.com
}

# execute your command
$1 || printf "\x1B[31m Only the following commands are accepted
'startBackend' - to start only the backend (webservices)
'startFrontend' - to start only the fronend app
'start' - to start both the webservice and the web application
'install' - to install dependencies \n"
