const SocketIO = require('socket.io');
// const axios = require('axios');

// 유저 위치를 저장할 객체

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const nav = io.of('/navigation');

    //서버에서 먼저 통로연걸
    nav.on('connection', (socket) => {

        console.log('네비게이션 통로에 접속');
        socket.on("send location", (data) => {

            //객체를 가지고 반경거리? 계산
            //반경거리? 무슨 위경도를가지고 데이터를 실시간 조작해서
            //다시 리시브 로케이션
            //
            socket.emit("receive location", data);
            console.log(data)

        })
    })
}

    //     // 접속된 모든 클라이언트에게 메시지를 전송한다
            //1:n
    //     io.emit('event_name', msg);

    //     // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
    //     1:1 다이다이
    //     socket.emit('event_name', msg);

    //     // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    //     socket.broadcast.emit('event_name', msg);

    //     // 특정 클라이언트에게만 메시지를 전송한다
    //     io.to(id).emit('event_name', data);


    //     socket.on('disconnect', () => {
    //         console.log('네비게이션 통로에 접속 해제');
    //     });