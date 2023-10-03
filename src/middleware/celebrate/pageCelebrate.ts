import { celebrate, Joi, Segments } from 'celebrate';

export const pageMiddleware = () => {
  return celebrate(
    {
      [Segments.QUERY]: {
        page: Joi.number().min(1),
      },
    },
    { abortEarly: false }
  );
};
