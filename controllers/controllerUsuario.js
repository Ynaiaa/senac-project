const mockUsuarios = require('../database/mockUsuario')
const mockPacientes = require('../database/mockPaciente')
const mockMedicos = require('../database/mockMedico')

exports.logarUsuario = async (req, res) => {

    const { email, senha } = req.body

    let usuarios = mockUsuarios.listarUsuarios()

    let usuario = usuarios.find((usuario) => usuario.login === email)

    if (usuario?.type === 1) {
        let paciente = mockPacientes.listarPacientes().find((paciente) => paciente.user_id === usuario.id)
        return res.json({
            id: paciente.id,
            user_id: paciente.user_id,
            nome: paciente.nome,
            type: usuario.type
        })
    } else if (usuario?.type === 2) {
        let medico = mockMedicos.listarMedicos().find((medico) => medico.user_id === usuario.id)
        return res.json({
            id: medico.id,
            user_id: medico.user_id,
            nome: medico.nome,
            type: usuario.type
        })
    } else {
        res.status(404).json({ erro: 'Not found' })
    }
}

exports.getUsuario = async (req, res) => {
    const usuarios = mockUsuarios.listarUsuarios()
    return res.status(200).json(usuarios)
}

exports.getUsuarioId = async (req, res) => {
    const usuario = mockUsuarios.listarUsuarioPorId(req.params.id)

    if (usuario) return res.status(200).json(usuario)
    return res.status(404).json({ error: `Não foi possível encontrar o usuário com id ${req.params.id}.` })
}

exports.postUsuario = async (req, res) => {
    console.log('POST | Usuárioooooo', req.body)
    const novoUsuario = mockUsuarios.criarUsuario(req.body)

    if (novoUsuario) return res.status(201).json(novoUsuario)
    return res.status(500).json({ error: 'Não foi possível salvar o usuário.' })
}

exports.putUsuario = async (req, res) => {
    const usuarioEditado = mockUsuarios.editarUsuario(req.params.id, req.body)
    if (usuarioEditado) return res.status(201).json({ message: 'Usuário editado com sucesso' })
    return res.status(500).json({ error: 'Não foi possível editar o usuário.' })
}

exports.deleteUsuario = async (req, res) => {
    const usuarioExcluido = mockUsuarios.deletarUsuario(req.params.id)
    if (usuarioExcluido) return res.status(201).json({ message: 'Usuário excluido com sucesso' })
}