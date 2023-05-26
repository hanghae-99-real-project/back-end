#!/bin/bash
cd /home/ubuntu/back-end 
# 현재 실행 중인 프로세스 종료
sudo cp ../.env .
npm install
npm start 
