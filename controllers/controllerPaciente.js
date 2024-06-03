const mockPaciente = require('../database/mockPaciente')

exports.getPacientes = async (req, res) => {
    const pacientes = mockPaciente.listarPacientes()
    res.status(200).json(pacientes)
}

exports.getPacienteId = async (req, res) => {
    const paciente = mockPaciente.listarPacientePorId(req.params.id)

    if (paciente) res.status(200).json(paciente)
    res.status(404).json({ error: `Não foi possível encontrar o paciente com id ${req.params.id}.` })
}

exports.postPaciente = async (req, res) => {
    const novoPaciente = mockPaciente.criarPaciente(req.body)

    if (novoPaciente) res.status(201).json(novoPaciente)
    res.status(500).json({ error: 'Não foi possível salvar o paciente.' })
}

exports.putPaciente = async (req, res) => {
    const pacienteEditado = mockPaciente.editarPaciente(req.params.id, req.body)
    if (pacienteEditado) res.status(201).json({ message: 'Paciente editado com sucesso' })
    res.status(500).json({ error: 'Não foi possível editar o paciente.' })
}

exports.deletePaciente = async (req, res) => {
    const pacienteExcluido = mockPaciente.deletarPaciente(req.params.id)
    if (pacienteExcluido) res.status(201).json({ message: 'Paciente excluido com sucesso' })
}