const Joi = require('joi');

const schemaAgendamentoServico = Joi.object({
    user_Id: Joi.string()
        .required()
        .messages({
            "any.required": 'O ID do usuário é obrigatório.',
            "string.base": 'O campo user_Id deve ser uma string.'
        }),
    servico_id: Joi.string()
        .required()
        .messages({
            "any.required": 'O ID do serviço é obrigatório.',
            "string.base": 'O campo servico_id deve ser uma string.'
        }),
    horario: Joi.string()  
        .required()
        .isoDate() 
        .messages({
            "any.required": 'O horário do agendamento é obrigatório.',
            "date.isoDate": 'O horário deve estar no formato ISO (YYYY-MM-DDTHH:MM:SS).'
        })
});

module.exports = schemaAgendamentoServico;
