const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const RandomLostpostsController = require("../controllers/randomLostposts.controller");
const randomLostpostsController = new RandomLostpostsController();

router.get("/lostposts", authMiddleware, randomLostpostsController.getNearbyRandomPosts);



module.exports = router;
