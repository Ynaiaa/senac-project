let usuarios = []

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
