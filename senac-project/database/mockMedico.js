let medicos = []

exports.listarMedicos = () => medicos

exports.listarMedicoPorId = (id) => medicos.find((medico) => medico.id === id)

exports.criarMedico = (novoMedico) => {
    let id = Date.now().toString()

    let novo = {
        id,
        ...novoMedico
    }

    medicos.push(novo)
}

exports.editarMedico = (id, medico) => {
    let index = medicos.findIndex((medico) => medico.id === id)

    if (index) {
        medicos[index] = { ...medico[index], ...medico }
        return true
    }
    return false
}

exports.editarAgendaMedico = (id, consulta) => {
    let index = medicos.findIndex((medico) => medico.id === id)

    if (index) {
        medicos[index].agenda.push(consulta)
        return true
    }
    return false
}

exports.deletarMedico = (id) => {
    let index = medicos.findIndex((medico) => medico.id === id)

    if (index) {
        medicos.splice(index, 1)
        return true
    }
    return false
}

exports.medicos
