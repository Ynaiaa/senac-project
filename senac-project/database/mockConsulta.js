const gerarDataAleatoria = require("../utils/generateRandomDate")

let consultas = [{
    id: 1,
    paciente_id: 1,
    medico_id: 1,
    data: gerarDataAleatoria(),
    hora: Math.floor(Math.random() * (18 - 8 + 1)) + 8
},
{
    id: 2,
    paciente_id: 1,
    medico_id: 2,
    data: gerarDataAleatoria(),
    hora: Math.floor(Math.random() * (18 - 8 + 1)) + 8
},
{
    id: 3,
    paciente_id: 2,
    medico_id: 3,
    data: gerarDataAleatoria(),
    hora: Math.floor(Math.random() * (18 - 8 + 1)) + 8
},
{
    id: 4,
    paciente_id: 2,
    medico_id: 4,
    data: gerarDataAleatoria(),
    hora: Math.floor(Math.random() * (18 - 8 + 1)) + 8
},
]

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
