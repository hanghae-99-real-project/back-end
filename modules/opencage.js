// 필요한 모듈 임포트
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const opencage = require('opencage-api-client');  // 추가

// Express 앱 생성
const app = express();
const server = http.createServer(app);

// 현재 디렉토리를 정적으로 서빙
app.use(express.static(__dirname));

// Socket.IO 서버 생성
const io = socketIO(server);

// 유저 위치를 저장할 객체
const userLocations = {};

// 클라이언트 연결 시 처리
io.on('connection', (socket) => {
    console.log('새로운 클라이언트 연결');

    // 클라이언트에서 위치 정보를 전송받음
    socket.on('sendLocation', (location) => {
        // 유저 위치 정보를 저장
        userLocations[socket.id] = location;

        // OpenCage API를 이용하여 위치 이름 조회
        opencage.geocode({ key: "63cf6859c77e43e285aed8a05e4e5eb5", q: `${location.latitude}, ${location.longitude}` }).then(data => {
            if (data.status.code == 200) {
                if (data.results.length > 0) {
                    const place = data.results[0];
                    console.log(place.formatted);

                    // 다른 클라이언트에 유저 위치와 위치 이름 전송
                    io.emit('userLocation', { userId: socket.id, location, place: place.formatted });
                }
            } else {
                console.log('error', data.status.message);
            }
        }).catch(error => {
            console.log('error', error.message);
        });
    });

    // 클라이언트 연결 종료 시 처리
    socket.on('disconnect', () => {
        console.log('클라이언트 연결 종료');

        // 유저 위치 정보 삭제
        delete userLocations[socket.id];

        // 다른 클라이언트에 유저 연결 종료 정보 전송
        io.emit('userDisconnect', socket.id);
    });
});

// 서버 시작
const port = 3000;
server.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
