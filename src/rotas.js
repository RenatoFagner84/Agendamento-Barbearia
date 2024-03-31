const express = require('express')
const {cadastrarUsuario, login, agendarServico, visualizarDisponibilidade, gerenciarAgendamentos} = require('./controladores/usuarios')
const validarCorpoReq = require('./intermediario/validarCorpoRequisicao')
const schemaUsuario = require('./schema/schemaUsuario')
const schemaLoginUsuario = require('./schema/schemaLogin')
const schemaAgendamentoServico = require('./schema/schemaAgendamento')
const rotas = express()

rotas.post('/usuario',validarCorpoReq(schemaUsuario),cadastrarUsuario)
rotas.post('/login',validarCorpoReq(schemaLoginUsuario),login)
rotas.post('/agendar',validarCorpoReq(schemaAgendamentoServico),agendarServico)
rotas.get('/disponibilidade/:servico', visualizarDisponibilidade)
rotas.get('/agendamentos/:userId', gerenciarAgendamentos)


module.exports = rotas