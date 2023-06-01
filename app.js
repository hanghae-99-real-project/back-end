const express = require("express");
const cors = require("cors")
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const session = require("./middlewares/session");
const checkSession = require("./middlewares/checkSession-middleware")
const errorHandler = require("./middlewares/error-handler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const morgan = require('morgan')
const router = require("./(0)routes");

const app = express();

dotenv.config();

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session)
app.use(checkSession)


app.use("/api", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
  console.log(`running http://localhost:${process.env.PORT}`);
});
