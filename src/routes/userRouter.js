const express = require('express');
const router = express.Router();

const controller = require("../controller/userController.js")
 
router.post ("/signup", controller.signUp)
router.post("/signin", controller.signIn)
router.get("/:id", controller.findUser)

module.exports = router