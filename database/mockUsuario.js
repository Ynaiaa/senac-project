let usuarios = [{
    id: 1,
    type: 'paciente',
    senha: '1234',
    login: 'admin'
},
{
    id: 2,
    type: 'paciente',
    senha: '1234',
    login: 'admin'
},
{
    id: 3,
    type: 'medico',
    senha: '1234',
    login: 'admin'
},
{
    id: 4,
    type: 'medico',
    senha: '1234',
    login: 'admin'
},
{
    id: 5,
    type: 'medico',
    senha: '1234',
    login: 'admin'
}
    ,
{
    id: 6,
    type: 'medico',
    senha: '1234',
    login: 'admin'
}]

exports.listarUsuarios = () => usuarios

exports.listarUsuarioPorId = (id) => usuarios.find((usuario) => usuario.id === id)

exports.criarUsuario = (novoUsuario) => {
    let id = Date.now().toString()

    let novo = {
        id,
        ...novoUsuario
    }

    usuarios.push(novo)
    return novo
}

exports.editarUsuario = (id, usuario) => {
    let index = usuarios.findIndex((usuario) => usuario.id === id)

    if (index) {
        usuarios[index] = { ...usuarios[index], ...usuario }
        return true
    }
    return false
}

exports.deletarUsuario = (id) => {
    let index = usuarios.findIndex((usuario) => usuario.id === id)

    if (index) {
        usuarios.splice(index, 1)
        return true
    }
    return false
}
