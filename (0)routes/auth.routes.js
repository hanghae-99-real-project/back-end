const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const UserController = require("../(1)controllers/users.controller");
const userController = new UserController();


module.exports = router;
