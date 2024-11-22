const gerarDataAleatoria = require("../utils/generateRandomDate")

let consultas = [{
    id: 1,
    paciente_id: 1,
    medico_id: 1,
    data: gerarDataAleatoria(),
    hora: gerarDataAleatoria()
},
{
    id: 2,
    paciente_id: 1,
    medico_id: 2,
    data: gerarDataAleatoria(),
    hora: gerarDataAleatoria()
},
{
    id: 3,
    paciente_id: 2,
    medico_id: 3,
    data: gerarDataAleatoria(),
    hora: gerarDataAleatoria()
},
{
    id: 4,
    paciente_id: 2,
    medico_id: 4,
    data: gerarDataAleatoria(),
    hora: gerarDataAleatoria()
},
]

const mockMedicos = require('../database/mockMedico')
const mockPaciente = require('../database/mockPaciente')
const gerarID = require("../utils/generateRandomStringID")

exports.listarConsultas = () => consultas

exports.listarConsultaPorId = (id) => consultas.find((consulta) => consulta.id == id)

exports.listarConsultasPaciente = (id) => {
    console.log(id)
    try {
        const _consultas = consultas.filter((consulta) => consulta.paciente_id == id)
        console.log(`consutlas`, consultas)
        const result = _consultas.map((item) => {
            console.log('item', item)
            let medico = mockMedicos.listarMedicoPorId(item.medico_id)
            let paciente = mockPaciente.listarPacientePorId(item.paciente_id)
            console.log('paciente', paciente)
            console.log('medico', medico)
            return {
                ...item,
                medico_nome: medico.nome,
                paciente_nome: paciente.nome,
                categoria_medico: medico.categoria
            }
        })

        return result
    } catch (error) {
        console.log('error listarConsultasPaciente', error)
    }

}

exports.listarConsultasMedico = (id) => {
    const _consultas = consultas.filter((consulta) => consulta.medico_id == id)

    const result = _consultas.map((item) => {
        let medico = mockMedicos.listarMedicoPorId(item.medico_id)
        let paciente = mockPaciente.listarPacientePorId(item.paciente_id)

        return {
            ...item,
            medico_nome: medico.nome,
            paciente_nome: paciente.nome,
            categoria_medico: medico.categoria
        }
    })

    return result
}

exports.criarConsulta = (novaConsulta) => {
    let id = gerarID()

    let novo = {
        id,
        ...novaConsulta
    }

    consultas.push(novo)
    return novo
}

exports.editarConsulta = (id, consulta) => {
    console.log('Editar consulta', id, consulta)
    let index = consultas.findIndex((consulta) => consulta.id == id)

    if (index) {
        consultas[index] = { ...consultas[index], ...consulta }
        return true
    }
    return false
}

exports.deletarConsulta = (id) => {

    try {
        let index = consultas.findIndex((consulta) => consulta.id == id)

        if (index >= 0) {

            consultas.splice(index, 1)
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}
