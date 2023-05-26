#!/bin/bash
sudo \cp -rf /home/ubuntu/temp /home/ubuntu/back-end
sudo cp /home/ubuntu/.env /home/ubuntu/back-end/
cd /home/ubuntu/back-end 
npm install
npm start 

if [ -d /home/ubuntu/temp ]; then
    sudo rm -rf /home/ubuntu/temp
fi
