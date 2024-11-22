const gerarID = require("../utils/generateRandomStringID")

let usuarios = [{
    id: 1,
    type: 1,
    senha: '1234',
    login: 'admin1'
},
{
    id: 2,
    type: 1,
    senha: '1234',
    login: 'admin2'
},
{
    id: 3,
    type: 2,
    senha: '1234',
    login: 'admin3'
}]

exports.listarUsuarios = () => usuarios

exports.listarUsuarioPorId = (id) => usuarios.find((usuario) => usuario.id === id)

exports.criarUsuario = (novoUsuario) => {
    let id = gerarID()
    console.log('novoUsuario', novoUsuario)
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
