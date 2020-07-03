#/!/bin/bash

## This script starts both the front end and backend
startBackend() {
  cd backend
  npm run watch &
}

startFrontend() {
  cd ../frontend
  npm run serve
}

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

}

start() {
  startBackend && startFrontend
}

$1
