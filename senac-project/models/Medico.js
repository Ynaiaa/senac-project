const mongoose = require('mongoose')

const MedicoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    categoria: {
        type: 'clinico' || 'psicologo' || 'oftalmologista' || 'urologista',
        required: true
    },
    agenda: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consulta'
    }]
})

module.exports = mongoose.model('Medico', MedicoSchema)