const mockMedicos = require('../database/mockMedico')

exports.getMedicos = async (req, res) => {
    const medicos = mockMedicos.listarMedicos()
    res.status(200).json(medicos)
}

exports.getMedicosId = async (req, res) => {
    const medico = mockMedicos.listarMedicoPorId(req.params.id)

    if (medico) res.status(200).json(medico)
    res.status(404).json({ error: `Não foi possível encontrar o médico com id ${req.params.id}.` })
}

exports.postMedico = async (req, res) => {
    const novoMedico = mockMedicos.criarMedico(req.body)

    if (novoMedico) res.status(201).json(novoMedico)
    res.status(500).json({ error: 'Não foi possível salvar o médico.' })
}

exports.putMedico = async (req, res) => {
    const medicoEditado = mockMedicos.editarMedico(req.params.id, req.body)
    if (medicoEditado) res.status(201).json({ message: 'Médico editado com sucesso' })
    res.status(500).json({ error: 'Não foi possível editar o médico.' })
}

exports.deleteMedico = async (req, res) => {
    const medicoExcluido = mockMedicos.deletarMedico(req.params.id)
    if (medicoExcluido) res.status(201).json({ message: 'Médico excluido com sucesso' })
}
