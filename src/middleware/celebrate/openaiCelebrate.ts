import TestTypeEnum from '../../enum/testTypeEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const openaiSendMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        input: Joi.string().trim().min(1).max(50000).required(),
        context: Joi.string().trim().min(1).max(50000),
        type: Joi.string()
          .valid(...Object.values(TestTypeEnum))
          .required(),
        output: Joi.string().trim().min(1).max(50000),
      },
    },
    { abortEarly: false }
  );
};
