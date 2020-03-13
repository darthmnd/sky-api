const express = require('express');
const router = express.Router();
const controller = require("../controller/userController.js")
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || "MYS3CR3T"
require('dotenv').config();


const auth = (req, res, next) => {
  const authHeader = req.get('authorization')
  let authenticated = false

  if (!authHeader) {
    return res.status(401).json(
      {
        msg: "Você precisa fazer login!"
      })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error) {
      authenticated = false
    } else {
      if (decoded._id == req.params._id) {
        authenticated = true
      } else {
        authenticated = false
      }
    }
  })

  if (!authenticated) {
    return res.status(403).json(
      {
        msg:'Acesso negado.'
      })
  }

  next()
}
 

router.post ("/signup", controller.signUp)
router.post("/signin", controller.signIn)
router.get("/:id", auth, controller.findUser)

module.exports = router