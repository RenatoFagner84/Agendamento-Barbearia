const express = require('express')
const {cadastrarUsuario, login} = require('./controladores/usuarios')
const validarCorpoReq = require('./intermediario/validarCorpoRequisicao')
const schemaUsuario = require('./schema/schemaUsuario')
const rotas = express()

rotas.post('/usuario',validarCorpoReq(schemaUsuario),cadastrarUsuario)
rotas.post('/login',login)

module.exports = rotas