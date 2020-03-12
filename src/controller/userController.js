const userCollection = require('../model/userSchema')
const bcrypt = require('bcryptjs')

const signUp = (req, res) => {
    const cryptedPswd = bcrypt.hashSync(req.body.senha)
    req.body.senha = cryptedPswd
    const addNewUser = new userCollection(req.body)

    addNewUser.save((err) => {
        if(err){
            return res.status(400).json(
                {
                    erro: "E-mail já existente"
                })
        } else {
            return res.status(201).send(addNewUser)
        }
    })
}

const signIn = async (req, res) => {
        const email = req.body.email
        const senha = req.body.senha
        const user = await userCollection.findOne({ email })
        const validPswd = bcrypt.compareSync(senha, user.senha)

        if(validPswd) {
          return res.status(200).send(user)
        }
          return res.status(400).json(
        {
            erro: "Usuário e/ou senha inválidos"
        })
    }

module.exports = { 
    signUp,
    signIn
}