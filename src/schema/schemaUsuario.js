const joi = require('joi')

const schemaUsuario = joi.object({
    nome:joi.string().required().messages({
        "any.required":'O campo nome é obrigatório.',
        "string.empty":'Este campo não pode ser vazio.'
    }),
    email:joi.string().email().required().messages({
        "string.email":'O email precisa ser válido.',
        "any.required":'O campo email,é obrigatório.',
        "string.empty":'Este campo não pode ser vazio.'
    }),
    telefone:joi.number().required().messages({
        "any.required":'O campo telefone é obrigtório.',
        "string.empty":'Este campo não pode ser vazio.',
        "number.base":'Este campo não pode ser vazio.'
    }),
    senha:joi.string().min(6).required().messages({
        "any.required":'O campo senha é obrigatório.',
        "string.min":'A senha deve ter no mínimo 6 caracteres.',
    })
})

module.exports =  schemaUsuario
