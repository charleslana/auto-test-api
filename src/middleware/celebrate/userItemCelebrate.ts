import TestTypeEnum from '../../enum/testTypeEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const userItemValidateTypeMiddleware = () => {
  return celebrate(
    {
      [Segments.QUERY]: {
        filterType: Joi.string()
          .valid(...Object.values(TestTypeEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};
