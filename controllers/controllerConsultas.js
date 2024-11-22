const mockConsulta = require('../database/mockConsulta')
const mockMedicos = require('../database/mockMedico')
const mockPaciente = require('../database/mockPaciente')

//teste
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

exports.getMedicosConsultas = (req, res) => {
    const consultas = mockConsulta.listarConsultasMedico(req.params.id)
    if (consultas) {
        return res.status(200).json(consultas)
    }
    return res.status(404).json({ error: 'Não foi possível encontrar a consultas para o médico.' });
}

exports.getPacientesConsultas = (req, res) => {
    console.log('id', req.params.id)
    try {
        const consultas = mockConsulta.listarConsultasPaciente(req.params.id)
        if (consultas) {
            return res.status(200).json(consultas)
        }

    } catch (error) {
        console.log('error getPacientesConsultas', error)
        return res.status(404).json({ error: 'Não foi possível encontrar a consultas para o paciente.' });
    }
}

exports.postConsulta = async (req, res) => {

    const novaConsulta = mockConsulta.criarConsulta(req.body)
    if (novaConsulta) {
        return res.status(201).json(novaConsulta)
    }

    return res.status(500).json({ error: 'Não foi possível salvar a consulta.' })
}

exports.putConsulta = async (req, res) => {
    console.log('body', req.params.id, req.body)
    try {
        const consultaEditado = mockConsulta.editarConsulta(req.params.id, req.body)
        if (consultaEditado) return res.status(201).json({ message: 'Consulta editada com sucesso' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Não foi possível editar a consulta.' })
    }


}

exports.deleteConsulta = async (req, res) => {
    try {
        console.log('req.params.id', req.params.id)
        const consultaExcluida = mockConsulta.deletarConsulta(req.params.id)
        console.log('consultaExcluida', consultaExcluida)
        if (consultaExcluida) return res.status(201).json({ message: 'Consulta excluída com sucesso' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ erro: 'Não foi possível excluir a consulta' })
    }
}