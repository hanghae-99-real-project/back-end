const RedisStore = require("connect-redis").default
const redisClient = require('../modules/redisClient');
const session = require('express-session');


module.exports = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    resave: false,
    name: 'connect.sid',
    cookie: {
        secure: false, // if true: only transmit cookie over https, in prod, always activate this
        httpOnly: true, // if true: prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 30, // session max age in milliseconds
        sameSite: 'lax',
    },
});


// req.session.name = '세션ID' //세션등록
// req.sessionID //세션 아이디 확인
// req.session.destroy() //세션 모두제거
// req.session.data = "비밀번호"