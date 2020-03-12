const userCollection = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tkn = 'MIICXAIBAAKBgQCOl54HaBM/WiL/jPPdFGjm9f8VprUst1J+vs7G/YRGRHYLGqt+M/ljAhcROPy3FdaVi2smqqyZhf4d+EZ9lKM6LVed91sxvcyMFEp6x8R2KS9wIzUtJ6r1MAIKd8HURmbaN4V2TV/FLeOUANRCZ+QhYEy+eNbuVIJANYtXBUSn8QIDAQABAoGBAIuVS/MAJGdNuxjiSA5Q3mfIw03UhWIiirTb39rXbNbESbGRB/NguW38K8yGNoya6hY2BkwxowgeLKX11js0d5sSHgEgL+pDQtXshHu7vlYU0ksHwfmD/R8+ZHJH6F6L0vuzs4NoVK/8iQHFLboUjF2sORyuLHbBmFZQWhInet8pAkEA0OlL2uHCYhkNuokJ9H+OnJEqKS2BtYSkH3Hrh2opZg2HtvUtXEIxzmj/95CzxMXQtNJhQMK3ekvnF3Upcj2avwJBAK67i8OEKM2jerbFKrBqr6/kUkZeyHLA8I4L2C3/3nKPGUj/GAc2xxuK1XxnpC0e3Wqz5OMwzkWU4Ynblsdq2U8CQHu9U6LICbzVHh6YwP7C9xOhoBlXzPZZJGVDssA4j2DVLsednUqCIsIhy0s1uGUazi3sVpJnQwn7H1vzl6ME/j0CQAT7qj+4LCW5LM27j70aPcppW4NQPq0vHW0fn1moe2KO/CydwcSq5kC909rJZeA3ih755GQqRyeq2EfDMGidfncCQD770Za6sJP1/i1vcdoWuWYnhpiU8TNKjFb2vJEN598amcyJV9PlAAdEkszh6EDA76t6/yT6NoUn/y9x4YskzQo='

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
                tkn,
                { expiresIn: 180000 }
            )
            return res.status(200).send([ user , { token }])
        }
        return res.status(400).json({
            erro: "Usuário e/ou senha inválidos."
        })
    }
    return res.status(400).json({
        erro: "Usuário e/ou senha inválidos."
    })
}

const findUser = (req, res) => {
    const id = req.params.id
    return userCollection.findById(id, (err, user) => {
        if(user) {    
            return res.status(200).send(user)
        }
        return res.status(404).json({
            erro: "Usuário não encontrado"
        })
    })
}

module.exports = { 
    signUp,
    signIn,
    findUser
}