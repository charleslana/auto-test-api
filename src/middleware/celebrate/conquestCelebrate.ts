import TestTypeEnum from '../../enum/testTypeEnum';
import { celebrate, Joi, Segments } from 'celebrate';
import { escapeTagsHTML } from './commonCelebrate';
import { NextFunction, Request, Response } from 'express';

export const conquestCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().trim().min(1).max(255).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        description: Joi.string().trim().min(1).max(50000).messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        experience: Joi.number().min(0).max(9999999).required(),
        type: Joi.string()
          .valid(...Object.values(TestTypeEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export const conquestUpdateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().trim().min(1).max(255).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        description: Joi.string().trim().min(1).max(50000).messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        experience: Joi.number().min(0).max(9999999).required(),
        type: Joi.string()
          .valid(...Object.values(TestTypeEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export function escapeConquestHTMLMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  if (request.body.name) {
    request.body.name = escapeTagsHTML(request.body.name);
  }
  if (request.body.description) {
    request.body.description = escapeTagsHTML(request.body.description);
  }
  next();
}
