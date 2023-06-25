import { celebrate, Joi, Segments } from 'celebrate';

export const openaiSendMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        content: Joi.string().required().min(1).max(50000),
      },
    },
    { abortEarly: false }
  );
};
