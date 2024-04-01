const Joi = require('joi');

const schemacadastrarAdministrador = Joi.object({
    nome: Joi.string().required().messages({
        "any.required": 'O nome é obrigatório.',
        "string.base": 'O campo nome deve ser uma string.'
    }),
    email: Joi.string().email().required(),
    senha: Joi.string().required().min(6).required()
    
})

module.exports = schemacadastrarAdministrador