const Joi = require('joi');

const schemaLoginAdministrador = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O e-mail é obrigatório.',
        'string.email': 'E-mail inválido.'
    }),
    senha: Joi.string().required().messages({
        'any.required': 'A senha é obrigatória.'
    })
});

module.exports = schemaLoginAdministrador;
