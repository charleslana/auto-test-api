import { celebrate, Joi, Segments } from 'celebrate';
import { escapeTagsHTML } from './commonCelebrate';
import { NextFunction, Request, Response } from 'express';

export const itemCreateMiddleware = () => {
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
        expiryDay: Joi.number().min(1).max(365),
      },
    },
    { abortEarly: false }
  );
};

export const itemUpdateMiddleware = () => {
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
        expiryDay: Joi.number().min(1).max(365),
      },
    },
    { abortEarly: false }
  );
};

export function escapeItemHTMLMiddleware(
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
