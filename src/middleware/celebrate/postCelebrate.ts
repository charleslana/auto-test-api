import { celebrate, Joi, Segments } from 'celebrate';
import { escapeTagsHTML } from './commonCelebrate';
import { NextFunction, Request, Response } from 'express';

export const postCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        title: Joi.string().trim().min(1).max(255).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        description: Joi.string().trim().min(1).max(50000).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        enable: Joi.boolean().valid(true, false).messages({
          'boolean.base': 'O parâmetro {{#label}} deve ser um valor booleano',
          'any.only': 'O parâmetro {{#label}} deve ser "true" ou "false"',
          'any.required': 'O parâmetro {{#label}} é obrigatório',
        }),
      },
    },
    { abortEarly: false }
  );
};

export const postUpdateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        title: Joi.string().trim().min(1).max(255).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        description: Joi.string().trim().min(1).max(50000).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        enable: Joi.boolean().valid(true, false).messages({
          'boolean.base': 'O parâmetro {{#label}} deve ser um valor booleano',
          'any.only': 'O parâmetro {{#label}} deve ser "true" ou "false"',
          'any.required': 'O parâmetro {{#label}} é obrigatório',
        }),
      },
    },
    { abortEarly: false }
  );
};

export function escapePostHTMLMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  if (request.body.title) {
    request.body.title = escapeTagsHTML(request.body.title);
  }
  if (request.body.description) {
    request.body.description = escapeTagsHTML(request.body.description);
  }
  next();
}
