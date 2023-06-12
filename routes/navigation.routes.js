const express = require("express");
const router = express.Router();
const NavigationController = require("../controllers/navigation.controller.js");
const navigationControllerController = new NavigationController();


//길찾기 시작
router.get("/", navigationControllerController.startNav);

//길찾기 종료
router.post("/", navigationControllerController.endNav);

module.exports = router;