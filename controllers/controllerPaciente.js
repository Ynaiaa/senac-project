const mockPaciente = require('../database/mockPaciente')

exports.getPacientes = async (req, res) => {
    const pacientes = mockPaciente.listarPacientes()
    return res.status(200).json(pacientes)
}

exports.getPacienteId = async (req, res) => {
    const paciente = mockPaciente.listarPacientePorId(req.params.id)

    if (paciente) return res.status(200).json(paciente)
    res.status(404).json({ error: `Não foi possível encontrar o paciente com id ${req.params.id}.` })
}

exports.postPaciente = async (req, res) => {
    console.log('postPaciente', req.body)
    const novoPaciente = mockPaciente.criarPaciente(req.body)
    console.log('novoPaciente', novoPaciente)
    if (novoPaciente) return res.status(201).json(novoPaciente)
    res.status(500).json({ error: 'Não foi possível salvar o paciente.' })
}

exports.putPaciente = async (req, res) => {
    const pacienteEditado = mockPaciente.editarPaciente(req.params.id, req.body)
    if (pacienteEditado) return res.status(201).json({ message: 'Paciente editado com sucesso' })
    res.status(500).json({ error: 'Não foi possível editar o paciente.' })
}

exports.deletePaciente = async (req, res) => {
    const pacienteExcluido = mockPaciente.deletarPaciente(req.params.id)
    if (pacienteExcluido) return res.status(201).json({ message: 'Paciente excluido com sucesso' })
}