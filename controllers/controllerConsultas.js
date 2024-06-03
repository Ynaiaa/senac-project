const mockConsulta = require('../database/mockConsulta')
const mockMedicos = require('../database/mockMedico')
const mockPaciente = require('../database/mockPaciente')


exports.getConsultas = async (req, res) => {
    const consultas = mockConsulta.listarConsultas()
    res.status(200).json(consultas)
}

exports.getConsultaId = async (req, res) => {
    const consulta = mockConsulta.listarConsultaPorId(req.params.id);

    if (consulta) {
        return res.status(200).json(consulta);
    }
    return res.status(404).json({ error: 'Não foi possível encontrar a consulta com id ${req.params.id}.' });
};

exports.postConsulta = async (req, res) => {

    const novaConsulta = mockConsulta.criarConsulta(req.body)

    if (novaConsulta) {

        mockMedicos.editarAgendaMedico(req.body.medico_id, req.body, 'add')
        mockPaciente.editarAgendaPaciente(req.body.paciente_id, req.body, 'add')
        res.status(201).json(novaConsulta)
    }

    res.status(500).json({ error: 'Não foi possível salvar a consulta.' })
}

exports.putConsulta = async (req, res) => {
    const consultaEditado = mockConsulta.editarConsulta(req.params.id, req.body)
    if (consultaEditado) res.status(201).json({ message: 'Consulta editada com sucesso' })
    res.status(500).json({ error: 'Não foi possível editar a consulta.' })
}

exports.deleteConsulta = async (req, res) => {
    const consultaExcluida = mockConsulta.deletarConsulta(req.params.id)

    mockMedicos.editarAgendaMedico(req.body.medico_id, req.body, 'deletar')
    mockPaciente.editarAgendaPaciente(req.body.paciente_id, req.body, 'deletar')

    if (consultaExcluida) res.status(201).json({ message: 'Consulta excluída com sucesso' })
}