const mongoose = require('mongoose')
const DB_URL  = process.env.MONGODB_URI || 'mongodb://localhost:27017/SkyDB'
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