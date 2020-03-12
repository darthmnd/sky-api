const express = require('express');
const router = express.Router();
const controller = require("../controller/userController.js")
const user = require('../model/database')
const jwt = require('jsonwebtoken')
const SECRET = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMvjU3H0JWqXLTN1krauUYFEziZLTm8iLmDjL1TUg6u+58PZY0olHh3hou/q5EdOU5y5P1UmIAQ0SquueCXw2NSvevDstQ3pq5EJDzsLq5mU8S/IAQNXMO5T+hSQ+SsMkBHKS2IgjWC3v4Aqn/s4ZCFbG7qfSf3RIgZshbSuZDbNAgMBAAECgYEAltHnJTFkCDAiSKGdULMsKYKbOCqWr5DKW/NSTN8TM5V5Xh/N2cgROitx2yWXjcO8B//kgHk+T73aypq5198MlR0Ks7tPCv+vMIXflobSRj+Hqas68X24PSss4REq70fUBUbI2hMeiVhOSxtwKWhL5v4uQmQseIia2dUUKmJ8XaUCQQD1SUpwXkc9ABe3OV89zhfqAjb4SCnF5/EqkfjG7/ns3e/Q6sxanDEkglW6rmsjT4x0DqV7ziWlDTG1WP8EC+YvAkEA1MsiHFKErFob12yicD2ZD9zebLT2/Nu/vDVH+NftLH/x6oRTPMIuMUTpCGDaYj6lSw9MI7IawV5ENLt8K/LvwwJAYOQyo3Cac142AAqJtMBUcfut+yWGWsbkXQyMWQkykH6a3MvjLWfFgcZ6VuPPLoOd17pxZBZqiGhN2nTtR4vrwQJAJVYa/xMvejo5RlwmSEFWmOTtFe/OomFATBqhLTVdxQASB07+d9uuVTC9Hp430yMgx4HAn0bB0QnkN8hpqiBvFwJALPRxgbjIK51DstortwIGAas9n7UUYWA74uXfGDLkuV9knq0/1T7F2VU4HuYKfHEneXLk/W55bCDc2OBinkAVwA=="

const userAuth = (req, res, next) => {
    const authHeader = req.get('authorization')
    let auth = false
    const token = authHeader.split(' ')[1]

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        auth = false
      } else {
        if (decoded._id === req.params._id)  {
          auth = true
        } else {
          auth = false
        }
      }
    })
  
    if (auth === false) {
      return res.status(403).json(
        { 
            msg: "Acesso negado"
        })
    } else {
        return res.status(200).send(user)
    }
}
 
router.post ("/signup", controller.signUp)
router.post("/signin", controller.signIn)
router.get("/:id", userAuth, controller.findUser)

module.exports = router