const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser");
// const http = require("http");

// const cors = require("cors");
// const { host } = require("./config/config");
const port = 3000;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cookieParser());



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

// // router
// const apiMainRouter = require("./routes/index");
// app.use("/api", [apiMainRouter]);

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});

module.exports = app;
