const gerarID = require("../utils/generateRandomStringID")

let pacientes = [{
    id: 1,
    user_id: 1,
    nome: 'Jõao Silva'
},
{
    id: 2,
    user_id: 2,
    nome: 'Marcelo Gomes'
}]

exports.listarPacientes = () => pacientes

exports.listarPacientePorId = (id) => pacientes.find((paciente) => paciente.id === id)

exports.criarPaciente = (novoPaciente) => {

    let id = gerarID()

    let novo = {
        id,
        ...novoPaciente
    }

    pacientes.push(novo)
    return novo
}

exports.editarPaciente = (id, paciente) => {
    let index = pacientes.findIndex((paciente) => paciente.id === id)

    if (index) {
        pacientes[index] = { ...pacientes[index], ...paciente }
        return true
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
