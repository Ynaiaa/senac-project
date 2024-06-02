let consultas = []

exports.listarConsultas = () => consultas

exports.listarConsultaPorId = (id) => consultas.find((consulta) => consulta.id === id)

exports.criarConsulta = (novaConsulta) => {
    let id = Date.now().toString()

    let novo = {
        id,
        ...novaConsulta
    }

    consultas.push(novo)
    return novo
}

exports.editarConsulta = (id, consulta) => {
    let index = consultas.findIndex((consulta) => consulta.id === id)

    if (index) {
        consultas[index] = { ...consultas[index], ...consulta }
        return true
    }
    return false
}

exports.deletarConsulta = (id) => {
    let index = consultas.findIndex((consulta) => consulta.id === id)

    if (index) {
        consultas.splice(index, 1)
        return true
    }
    return false
}
