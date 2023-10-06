import UserRankEnum from '../../enum/UserRankEnum';
import { celebrate, CelebrateError, Joi, Segments } from 'celebrate';

export const userCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string()
          .email()
          .trim()
          .max(50)
          .required()
          .messages({
            'string.email': 'O campo {{#label}} deve conter um e-mail válido.',
            'any.custom':
              'O campo {{#label}} deve conter apenas letras minúsculas.',
          })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .custom((value, _helpers) => {
            if (value !== value.toLowerCase()) {
              throw new CelebrateError(
                'O campo email deve conter apenas letras minúsculas.'
              );
            }
            return value;
          }),
        password: Joi.string().required().min(6).max(50),
        passwordConfirmation: Joi.string()
          .valid(Joi.ref('password'))
          .when('password', {
            is: Joi.exist(),
            then: Joi.required(),
          }),
      },
    },
    { abortEarly: false }
  );
};

export const userUpdateNameMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string()
          .pattern(/^[a-zA-ZÀ-ú0-9_ ]*$/)
          .trim()
          .min(3)
          .max(20)
          .required()
          .messages({
            'string.pattern.base':
              'o campo {{#label}} com o valor {:[.]} deve conter apenas letras, números, espaços ou o caractere underline',
            'string.min':
              'O tamanho do texto de {{#label}} deve ter pelo menos {{#limit}} caracteres',
            'string.max':
              '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
          }),
      },
    },
    { abortEarly: false }
  );
};

export const userLoginMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().trim().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false }
  );
};

export const userPasswordMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().min(6).max(50).required(),
        passwordConfirmation: Joi.string()
          .valid(Joi.ref('newPassword'))
          .when('newPassword', {
            is: Joi.exist(),
            then: Joi.required(),
          }),
      },
    },
    { abortEarly: false }
  );
};

export const userPageMiddleware = () => {
  return celebrate(
    {
      [Segments.QUERY]: {
        page: Joi.number().min(1),
        filterType: Joi.string().valid(...Object.values(UserRankEnum)),
      },
    },
    { abortEarly: false }
  );
};
