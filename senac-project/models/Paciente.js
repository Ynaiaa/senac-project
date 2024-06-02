const mongoose = require('mongoose')

const PacienteSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    agenda: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consulta'
    }]
})

module.exports = mongoose.model('Paciente', PacienteSchema)