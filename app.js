const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");
require("express-async-errors");
const port = 3000;
const morgan = require('morgan')
const router = require("./(0)routes");
const errorHandler = require("./middlewares/error-handler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");
const session = require("express-session");


//미들웨어
app.use(
  session({ secret: "secret key", resave: false, saveUninitialized: false })
);
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);
app.use(cors({ origin: "*", credentials: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`\x1b[35m%s\x1b[0m`, `running http://localhost:${port}`);
// }); // 색상 추가