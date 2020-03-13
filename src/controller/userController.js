const userCollection = require('../model/userSchema')
const { connect } = require('../model/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

connect()

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