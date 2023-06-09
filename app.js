const express = require("express");
require('module-alias/register');
const cors = require("cors");
const dotenv = require('dotenv');
require("express-async-errors");
const cookieParser = require("cookie-parser");
const RedisStore = require("connect-redis").default
const redisClient = require('./modules/redisClient');
const session = require('express-session');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const errorHandler = require("./middlewares/error-handler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const morgan = require('morgan');
const router = require("./routes");
const Sentry = require("@sentry/node");
const ms = require("ms");
const compression = require('compression');
const path = require('path');
const app = express();


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
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// express사용 정보 숨기기
app.disable("x-powered-by");
app.use(cors({ origin: ['http://localhost:3000', 'https://poodaeng.vercel.app'], credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  resave: false,
  name: 'connect.sid',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 30,
    sameSite: 'lax',
  },
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
app.use(errorHandler);
app.use(Sentry.Handlers.errorHandler());

app.get('/', (req, res) => {
  res.send("안녕")
});

app.listen(process.env.PORT, () => {
  console.log(`running http://localhost:${process.env.PORT}`);
});


