const userCollection = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = (req, res) => {
    const cryptedPswd = bcrypt.hashSync(req.body.senha)
    req.body.senha = cryptedPswd
    const addNewUser = new userCollection(req.body)

    addNewUser.save((err) => {
        if(err){
            return res.status(400).send(err)
        } else {
            return res.status(201).send(addNewUser)
        }
    })
}

const signIn = async (req, res) => {
        const email = req.body.email
        const senha = req.body.senha
        const user = await userCollection.findOne({ email })
        const validEmail = bcrypt.compareSync(senha, user.senha)

        if (validPswd) {
          return res.status(200).send(user)
        }
          return res.status(401).send(
        {
            error: "Usuário e/ou senha inválidos"
        })

    }

module.exports = { 
    signUp,
    signIn
}