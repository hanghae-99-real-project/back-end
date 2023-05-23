const cors = require("cors")
const express = require("express");
const cookieParser = require("cookie-parser");
require("express-async-errors");
const app = express();
const port = 3000;
const morgan = require('morgan')

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// cors
app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: "true",
    // cors options
  })
);

const router = require("./(0)routes");
const errorHandler = require("./middlewares/error-handler");

// const { host } = require("./config/config");

// app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"))
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`\x1b[35m%s\x1b[0m`, `running http://localhost:${port}`);
// }); // 색상 추가