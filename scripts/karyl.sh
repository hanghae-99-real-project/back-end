if pgrep -f node > /dev/null; then
    kill $(pgrep -f node)
fi


if [ -d /home/ubuntu/temp ]; then
    sudo rm -rf /home/ubuntu/temp
fi