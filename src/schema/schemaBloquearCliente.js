const Joi = require('joi');

const schemaBloquearCliente = Joi.object({
    clienteId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": 'O ID do cliente deve ser um número',
            "number.integer": 'O ID do cliente deve ser um número inteiro',
            "number.positive": 'O ID do cliente deve ser um número positivo',
            "any.required": 'O ID do cliente é obrigatório'
        })
});

module.exports = schemaBloquearCliente;
