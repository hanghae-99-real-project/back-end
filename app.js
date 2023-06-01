const express = require("express");
const cors = require("cors")
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
// const session = require('express-session');
// const RedisStore = require("connect-redis").default
require("express-async-errors");
const port = 3000;
const morgan = require('morgan')
const router = require("./(0)routes");
const errorHandler = require("./middlewares/error-handler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const redisClient = require("./modules/redisClient");
const app = express();

dotenv.config(); // env환경변수 파일 가져오기
//미들웨어

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));



// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: process.env.COOKIE_SECRET,
//   //세션 데이터를 redis에 저장
//   // Redis에 세션 데이터를 저장하는데 사용할 키의 접두사 설정
//   // 필요에 따라 수정할 수 있습니다.
//   // 세션 암호화를 위한 비밀 키
//   // 변경 사항이 없어도 세션을 항상 저장할지 여부
//   // 초기화되지 않은 세션도 저장할지 여부
//   store: new RedisStore({ client: redisClient, prefix: 'session:' }), // 세션 데이터를 로컬 서버 메모리가 아닌 redis db에 저장하도록 등록
//   cookie: { httpOnly: true, maxAge: 2592000000, secure: false }
// }))
app.use("/api", router);

app.use(errorHandler);




app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});
