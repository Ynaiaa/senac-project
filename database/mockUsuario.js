let usuarios = [{
    id: 1,
    type: 'paciente',
    senha: '1234',
    login: 'admin1'
},
{
    id: 2,
    type: 'paciente',
    senha: '1234',
    login: 'admin2'
},
{
    id: 3,
    type: 'medico',
    senha: '1234',
    login: 'admin3'
},
{
    id: 4,
    type: 'medico',
    senha: '1234',
    login: 'admin4'
},
{
    id: 5,
    type: 'medico',
    senha: '1234',
    login: 'admin5'
}
    ,
{
    id: 6,
    type: 'medico',
    senha: '1234',
    login: 'admin6'
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
