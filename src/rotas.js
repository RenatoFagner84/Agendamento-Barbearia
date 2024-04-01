const express = require('express')

const {cadastrarUsuario, login, agendarServico, visualizarDisponibilidade, gerenciarAgendamentos} = require('./controladores/usuarios')
const { listarClientes, bloquearCliente, excluirCliente, listarAgendamentos, cadastrarAdministradores, loginAdministrador } = require('./controladores/administrador')

const validarCorpoReq = require('./intermediario/validarCorpoRequisicao')
const validarAdmin = require('./intermediario/validarAdministrador')


const schemaUsuario = require('./schema/schemaUsuario')
const schemaLoginUsuario = require('./schema/schemaLogin')
const schemaAgendamentoServico = require('./schema/schemaAgendamento')
const schemaBloquearCliente = require('./schema/schemaBloquearCliente')
const schemacadastrarAdministrador = require('./schema/schemaCadastroAdministrador')
const schemaLoginAdministrador = require('./schema/schemaLoginadministradores')
const verificarAdminLogado = require('./intermediario/verificarAdminiLogado')


const rotas = express()

rotas.post('/usuario',validarCorpoReq(schemaUsuario),cadastrarUsuario)
rotas.post('/login',validarCorpoReq(schemaLoginUsuario),login)
rotas.post('/agendar',validarCorpoReq(schemaAgendamentoServico),agendarServico)
rotas.get('/disponibilidade/:servico', visualizarDisponibilidade)
rotas.get('/agendamentos/:userId', gerenciarAgendamentos)

//Rotas do administrador

rotas.post('/admin/cadastrar', validarCorpoReq(schemacadastrarAdministrador), cadastrarAdministradores)
rotas.post('/', validarCorpoReq(schemaLoginAdministrador),loginAdministrador)
rotas.get('/clientes',verificarAdminLogado, listarClientes)
rotas.put('/bloquear-cliente', validarAdmin, validarCorpoReq(schemaBloquearCliente), bloquearCliente)
rotas.delete('/excluir-cliente/:clienteId', verificarAdminLogado, excluirCliente)
rotas.get('/agendamentos', verificarAdminLogado, listarAgendamentos)


module.exports = rotas