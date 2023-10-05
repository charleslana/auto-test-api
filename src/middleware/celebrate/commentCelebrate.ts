import { celebrate, Joi, Segments } from 'celebrate';
import { escapeTagsHTML } from './commonCelebrate';
import { NextFunction, Request, Response } from 'express';

export const commentCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        postId: Joi.number().required(),
        message: Joi.string().trim().min(1).max(1000).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
      },
    },
    { abortEarly: false }
  );
};

export const commentUpdateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        message: Joi.string().trim().min(1).max(1000).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
      },
    },
    { abortEarly: false }
  );
};

export const commentPageMiddleware = () => {
  return celebrate(
    {
      [Segments.QUERY]: {
        postId: Joi.number().min(1).required(),
        page: Joi.number().min(1),
      },
    },
    { abortEarly: false }
  );
};

export function escapeCommentHTMLMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  if (request.body.message) {
    request.body.message = escapeTagsHTML(request.body.message);
  }
  next();
}
