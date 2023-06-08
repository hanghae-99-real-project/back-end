const express = require("express");
const cors = require("cors")
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
//const session = require("./middlewares/session");
const RedisStore = require("connect-redis").default
const redisClient = require('./modules/redisClient');
const session = require('express-session');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
//const checkSession = require("./middlewares/checkSession-middleware")
const errorHandler = require("./middlewares/error-handler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const morgan = require('morgan')
const router = require("./(0)routes");
const Sentry = require("@sentry/node")
//const sentryInterceptor = require("./middlewares/sentry-middleware")
const { IncomingWebhook } = require('@slack/webhook');
const config = {
  SlackWebhook: process.env.webHookUrl
};
const ms = require("ms");
const path = require('path');
const app = express();
const webSocket = require("./socket.js");



dotenv.config();

Sentry.init({
  dsn: process.env.DSN,
  //성능 추적을 위한 샘플링 비율 0 ~ 1로 지정하며 높은 값일수록 더 많은 추적데이터가 수집됨
  tracesSampleRate: 1.0,
  integrations: [
    //http 호출 추적 활성화
    new Sentry.Integrations.Http({ tracing: true }),
    //express.js 미들웨어 추적 추가 설정
    new Sentry.Integrations.Express({
      // to trace all requests to the default router
      app,
    })
  ]
});



//요청과 관련된 트랜잭션,스팬,브레드크럼 추적
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// express사용 정보 숨기기
app.disable("x-powered-by");
app.use(cors({ origin: ['http://localhost:3000', 'https://front-end-fork-m30hc9mpj-vegatality.vercel.app'], credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: true,
  resave: false,
  name: 'connect.sid',
  cookie: {
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: true, // if true: prevents client side JS from reading the cookie
    maxAge: 1000 * 120 * 30, // session max age in milliseconds
    sameSite: 'lax',
  },
}));
//app.use(checkSession)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


// const webhook = new IncomingWebhook(config.SlackWebhook);
// webhook
//   .send({
//     attachments: [
//       {
//         color: 'danger',
//         text: '백엔드 에러 발생',
//         fields: [
//           {
//             title: '에러가 발생했습니다',
//             value: 'sentry에서 확인하세요',
//             short: false,
//           },
//         ],
//         ts: Math.floor(new Date().getTime() / 1000).toString(),
//       },
//     ],
//   })
//   .catch((err) => {
//     if (err) Sentry.captureException(err);
//   });
app.use(Sentry.Handlers.requestHandler());
// https로 접속했을 때 http로 가지 않게 하기 위해 약 1년간 https로 묶어둔다.
app.use(helmet.hsts({
  maxAge: ms("1 year"),
  includeSubDomains: true
}));
// 1분동안 하나의 ip 주소에서 들어오는 request의 숫자를 100회로 제한
app.use(rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100
}));
// xss(교차 사이트 스크립팅) 공격 방어
app.use(helmet.xssFilter());
// 클릭재킹으로 부터 보호
app.use(helmet.frameguard("deny"));
// 브라우저에서 파일 형식의 임의 추측 금지
app.use(helmet.noSniff());
app.use("/api", router);
// app.use(webSocket)
app.use(errorHandler);
app.use(Sentry.Handlers.errorHandler());


app.use(express.static(path.join(__dirname)));

app.get('/navigation', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(process.env.PORT, () => {
  console.log(`running http://localhost:${process.env.PORT}`);
});


webSocket(server, app, session);