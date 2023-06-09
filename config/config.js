require("dotenv").config();

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "pooDeang",
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false
};

const test = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "pooDeang_test",
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false
};

const production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false
};

module.exports = { development, test, production };
