#!/bin/bash
echo "building"

# Installing dependecies
npm i

# entering the frontend-app
cd frontend-app

# installing dependecies
npm i

# building 
grunt

cd ..

node app.js


