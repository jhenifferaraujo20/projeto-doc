import Joi from "joi";

export const getBrandByIdValidator = Joi.object({
  id: Joi.string().required()
    .messages({
      'string.empty': 'ID da marca é obrigatório',
      'any.required': 'ID da marca é obrigatório'
    })
})

export const updateBrandBodyValidator = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "O id deve ser uma string.",
    "any.required": "O id é obrigatório.",
  }),
  nome: Joi.string().optional(),
  orcamentGeral: Joi.number().positive().optional().messages({
    "number.base": "O orçamento geral deve ser um número.",
    "number.positive": "O orçamento geral deve ser um número positivo.",
  }),
  orçamentoCampaign: Joi.number().positive().optional().messages({
    "number.base": "O orçamento de campanha deve ser um número.",
    "number.positive": "O orçamento de campanha deve ser um número positivo.",
  }),
  acessIdList: Joi.array().items(Joi.string()).optional(),
  socialMediaIds: Joi.array().items(Joi.string()).optional(),
  insightsMarcasIDs: Joi.array().items(Joi.string()).optional(),
  campanhaList: Joi.array().items(Joi.string()).optional(),
});
