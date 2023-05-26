#!/bin/bash
cd ..
# 현재 실행 중인 프로세스 종료
pm2 delete app.js


# 새로운 파일로 실행
pm2 start app.js