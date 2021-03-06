const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({ 
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
        },

        nome: {
            type: String,
            required: true
            },

        email: {
            type: String,
            unique: true,
            required: true
        },

        senha: {
            type: String,
	        required: true
        },

        telefone: {
                type: String, 
                required: true
            },

        data_criacao: {
            type: Date,
            default: Date.now,
            auto: true
        },

        data_atualizacao: {
            type: Date,
            default: Date.now,
            auto: true

        },
        

        ultimo_login:{
            type: Date,
            default: Date.now,
            auto: true
        },
})

const userCollection = mongoose.model('user', userSchema)
module.exports = userCollection