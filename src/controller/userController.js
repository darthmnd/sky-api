const userCollection = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET ="MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMvjU3H0JWqXLTN1krauUYFEziZLTm8iLmDjL1TUg6u+58PZY0olHh3hou/q5EdOU5y5P1UmIAQ0SquueCXw2NSvevDstQ3pq5EJDzsLq5mU8S/IAQNXMO5T+hSQ+SsMkBHKS2IgjWC3v4Aqn/s4ZCFbG7qfSf3RIgZshbSuZDbNAgMBAAECgYEAltHnJTFkCDAiSKGdULMsKYKbOCqWr5DKW/NSTN8TM5V5Xh/N2cgROitx2yWXjcO8B//kgHk+T73aypq5198MlR0Ks7tPCv+vMIXflobSRj+Hqas68X24PSss4REq70fUBUbI2hMeiVhOSxtwKWhL5v4uQmQseIia2dUUKmJ8XaUCQQD1SUpwXkc9ABe3OV89zhfqAjb4SCnF5/EqkfjG7/ns3e/Q6sxanDEkglW6rmsjT4x0DqV7ziWlDTG1WP8EC+YvAkEA1MsiHFKErFob12yicD2ZD9zebLT2/Nu/vDVH+NftLH/x6oRTPMIuMUTpCGDaYj6lSw9MI7IawV5ENLt8K/LvwwJAYOQyo3Cac142AAqJtMBUcfut+yWGWsbkXQyMWQkykH6a3MvjLWfFgcZ6VuPPLoOd17pxZBZqiGhN2nTtR4vrwQJAJVYa/xMvejo5RlwmSEFWmOTtFe/OomFATBqhLTVdxQASB07+d9uuVTC9Hp430yMgx4HAn0bB0QnkN8hpqiBvFwJALPRxgbjIK51DstortwIGAas9n7UUYWA74uXfGDLkuV9knq0/1T7F2VU4HuYKfHEneXLk/W55bCDc2OBinkAVwA=="

const signUp = (req, res) => {
    const cryptedPswd = bcrypt.hashSync(req.body.senha)
    req.body.senha = cryptedPswd
    const addNewUser = new userCollection(req.body)

    addNewUser.save((err) => {
        if(err){
            return res.status(400).json({
                erro: "E-mail já existente"
            })
        } else {
            return res.status(201).send(addNewUser)
        }
    })
}

const signIn = async (req, res) => {
    const user = await userCollection.findOne({ email: req.body.email })
    if (user) {
        const password = bcrypt.compareSync(req.body.senha, user.senha)
        if (password) {
            const token = jwt.sign(
                {
                _id: user._id
                },
                SECRET,
                { expiresIn: 1800 }
            )
            return res.status(200).send([ user , { token }])
        }
        return res.status(400).json(
        {
            msg: "Usuário e/ou senha inválidos."
        })
    }
    return res.status(400).json(
    {
        msg: "Usuário e/ou senha inválidos."
    })
}

const findUser = (req, res) => {
    const id = req.params.id
    return userCollection.findById(id, (err, user) => {
        if(user) { 
            return res.status(200).send(user)
        }
        return res.status(404).json(
        {
            msg: "Usuário não encontrado"
        })
    })
}

module.exports = { 
    signUp,
    signIn,
    findUser
}