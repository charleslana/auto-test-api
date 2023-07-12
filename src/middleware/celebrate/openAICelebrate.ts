import TestTypeEnum from '../../enum/TestTypeEnum';
import { celebrate, Joi, Segments } from 'celebrate';
import { escapeTagsHTML } from './commonCelebrate';
import { NextFunction, Request, Response } from 'express';

export const openAISendMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        input: Joi.string().trim().min(1).max(50000).required().messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        context: Joi.string().trim().min(1).max(50000).messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
        type: Joi.string()
          .valid(...Object.values(TestTypeEnum))
          .required(),
        output: Joi.string().trim().min(1).max(50000).messages({
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
      },
    },
    { abortEarly: false }
  );
};

export function escapeOpenAiHTMLMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  if (request.body.input) {
    request.body.input = escapeTagsHTML(request.body.input);
  }
  if (request.body.context) {
    request.body.context = escapeTagsHTML(request.body.context);
  }
  if (request.body.output) {
    request.body.output = escapeTagsHTML(request.body.output);
  }
  next();
}
