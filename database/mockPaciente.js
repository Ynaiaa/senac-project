let pacientes = [{
    id: 1,
    user_id: 1,
    nome: 'Jõao Silva',
    idade: 34,
    agenda: []
},
{
    id: 2,
    user_id: 2,
    nome: 'Marcelo Gomes',
    idade: 28,
    agenda: []
}]

exports.listarPacientes = () => pacientes

exports.listarPacientePorId = (id) => pacientes.find((paciente) => paciente.id === id)

exports.criarPaciente = (novoPaciente) => {
    let id = Date.now().toString()

    let novo = {
        id,
        ...novoPaciente
    }

    pacientes.push(novo)
}

exports.editarPaciente = (id, paciente) => {
    let index = pacientes.findIndex((paciente) => paciente.id === id)

    if (index) {
        pacientes[index] = { ...pacientes[index], ...paciente }
        return true
    }
    return false
}

exports.editarAgendaPaciente = (id, consulta, action) => {
    let index = pacientes.findIndex((paciente) => paciente.id === id)

    if (index) {
        if (action === 'add') {
            pacientes[index].agenda.push(consulta)
            return true
        }

        if (action === 'deletar') {
            const consultaIndex = pacientes[index].agenda.findIndex((ag) => ag.id === consulta.id)
            if (consultaIndex) {
                pacientes[index].agenda[consultaIndex].splice(consultaIndex, 1)
            }
        }
    }
    return false
}

exports.deletarPaciente = (id) => {
    let index = pacientes.findIndex((paciente) => paciente.id === id)

    if (index) {
        pacientes.splice(index, 1)
        return true
    }
    return false
}
