const mongoose = require('mongoose')
const DB_URL  = process.env.MONGODB_URI || 'mongodb://localhost:27017/SkyDB' || 'mongodb://heroku_bnxjq9p2:lcad5emb94s6p2mc78vgiou168@ds163905.mlab.com:63905/heroku_bnxjq9p2'
const connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true
        
    })
const connection = mongoose.connection
connection.on('error',() => console.error('Erro ao conectar no banco.'))

connection.once('open', () => console.log('Estamos conectados ao MongoDB.'))
}

module.exports = {
    connect
}