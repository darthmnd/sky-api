const express = require('express');
const router = express.Router();
const controller = require("../controller/userController.js")

//to fix
// const user = require('../model/userSchema')
// const jwt = require('jsonwebtoken')
// const SECRET = process.env.SECRET
// const userAuth = (req, res, next) => {
//     const authHeader = req.get('authorization')
//     const token = authHeader.split(' ')[1]

//     jwt.verify(token, SECRET, (err, user) => {
//       if (err) {
//         auth = false
//       } else {
//         if (user._id === req.params._id)  {
//           auth = true
//         } 
//       }
//     })
  
//     if (auth === false) {
//       return res.status(403).json(
//         { 
//             msg: "Acesso negado"
//         })
//     } else {
//         return res.status(200).send(user)
//     }
// }
 

router.post ("/signup", controller.signUp)
router.post("/signin", controller.signIn)
router.get("/:id", controller.findUser)

module.exports = router