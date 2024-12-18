var express = require('express')
var router = express.Router()

const usuarioController = require('../controllers/controllerUsuario')
const pacienteController = require('../controllers/controllerPaciente')
const medicoController = require('../controllers/controllerMedico')
const consultasController = require('../controllers/controllerConsultas')
const utilsController = require('../controllers/controllerUtils')

//Usuarios
router.post('/login', usuarioController.logarUsuario)
router.get('/usuarios', usuarioController.getUsuario)
router.get('/usuarios/:id', usuarioController.getUsuarioId)
router.post('/usuarios', usuarioController.postUsuario)
router.put('/usuarios/:id', usuarioController.putUsuario)
router.delete('/usuarios/:id', usuarioController.deleteUsuario)

//Paciente
router.get('/pacientes', pacienteController.getPacientes)
router.get('/pacientes/:id', pacienteController.getPacienteId)
router.post('/pacientes', pacienteController.postPaciente)
router.put('/pacientes/:id', pacienteController.putPaciente)
router.delete('/pacientes/:id', pacienteController.deletePaciente)

//Medicos
router.get('/medicos', medicoController.getMedicos)
router.get('/medicos/:id', medicoController.getMedicosId)
router.post('/medicos', medicoController.postMedico)
router.put('/medicos/:id', medicoController.putMedico)
router.delete('/medicos/:id', medicoController.deleteMedico)

//Consultas
router.get('/consultas', consultasController.getConsultas)
router.get('/consultas/:id', consultasController.getConsultaId)
router.get('/consultas-paciente/:id', consultasController.getPacientesConsultas)
router.get('/consultas-medico/:id', consultasController.getMedicosConsultas)
router.post('/consultas', consultasController.postConsulta)
router.put('/consultas/:id', consultasController.putConsulta)
router.delete('/consultas/:id', consultasController.deleteConsulta)

//Utils
router.get('/medicos-categorias', utilsController.getCategorias)

module.exports = router;
