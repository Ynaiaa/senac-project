const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    tipo: {
        type: 'paciente' | 'medico',
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema)