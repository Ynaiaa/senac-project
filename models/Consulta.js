const mongoose = require('mongoose')

const ConsultaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    paciente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    medico_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Consulta', ConsultaSchema)