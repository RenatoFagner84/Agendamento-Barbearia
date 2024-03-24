const express = require('express')
const {cadastrarUsuario, login} = require('./controladores/usuarios')
const validarCorpoReq = require('./intermediario/validarCorpoRequisicao')
const rotas = express()

rotas.post('/usuario',validarCorpoReq(['nome','email','telefone','senha']),cadastrarUsuario)
rotas.post('/login',login)

module.exports = rotas