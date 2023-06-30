import { celebrate, Joi, Segments } from 'celebrate';

export const shopCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        score: Joi.number().min(0).max(9999999).required(),
        itemId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};

export const shopUpdateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        score: Joi.number().min(0).max(9999999).required(),
        itemId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
