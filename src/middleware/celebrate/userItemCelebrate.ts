import { celebrate, Joi, Segments } from 'celebrate';

export const userItemCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        userId: Joi.number().required(),
        itemId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
