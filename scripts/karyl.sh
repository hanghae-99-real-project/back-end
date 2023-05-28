pm2_list=$(pm2 list)

if [[ $pm2_list == *"0      "|*"online"* ]]; then
    pm2 delete 0
fi

if pgrep -f node > /dev/null; then
    kill $(pgrep -f node)
fi



if [ -d /home/ubuntu/temp ]; then
    sudo rm -rf /home/ubuntu/temp
fi