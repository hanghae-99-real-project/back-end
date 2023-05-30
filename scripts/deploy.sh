#!/bin/bash
sudo \cp -rf /home/ubuntu/temp /home/ubuntu/back-end
sudo cp /home/ubuntu/.env /home/ubuntu/back-end/
cd /home/ubuntu/back-end 
npm install
pm2 start node app.js

if [ -d /home/ubuntu/temp ]; then
    sudo rm -rf /home/ubuntu/temp
fi



if pgrep -f node > /dev/null; then
    sudo kill $(pgrep -f node)
fi

if pgrep -f node > /dev/null; then
    sudo kill $(pgrep -f node)
fi

if pgrep -f node > /dev/null; then
    sudo kill $(pgrep -f node)
fi

if pgrep -f node > /dev/null; then
    sudo kill $(pgrep -f node)
fi