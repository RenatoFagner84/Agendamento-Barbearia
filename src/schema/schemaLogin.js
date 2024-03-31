const Joi = require('joi')
const schemaLoginUsuario = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": 'O email precisa ser válido.',
            "any.required": 'O campo email é obrigatório.',
            "string.empty": 'Este campo não pode ser vazio.'
        }),
    senha: Joi.string()
        .required()
        .messages({
            "any.required": 'O campo senha é obrigatório.'
        })
})
module.exports = schemaLoginUsuario