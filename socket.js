const SocketIO = require('socket.io');
// const axios = require('axios');


module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const nav = io.of('/navation');
    // const chat = io.of('/chat');

    //서버에서 먼저 통로연걸
    nav.on('connection', (socket) => {

        console.log('네비게이션 통로에 접속');
        socket.on("send location", (data) => {

            // userLocations[socket.id] = location;
            console.log(data)
            socket.emit("receive location", data);

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