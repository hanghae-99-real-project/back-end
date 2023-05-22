const express = require("express");
const cookieParser = require("cookie-parser");
require("express-async-errors");
// const cors = require("cors");
const app = express();
const port = 3000;
// const http = require("http");

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// // cors
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//     ],
//     credentials: "true",
//     // cors options
//   })
// );

const router = require("./(0)routes");
const errorHandler = require("./middlewares/error-handler");

// const { host } = require("./config/config");

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});