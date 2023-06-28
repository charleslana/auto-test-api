import TestTypeEnum from '../../enum/testTypeEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const userHistoricPageMiddleware = () => {
  return celebrate(
    {
      [Segments.QUERY]: {
        page: Joi.number().min(1).required(),
        filterType: Joi.string().valid(...Object.values(TestTypeEnum)),
      },
    },
    { abortEarly: false }
  );
};
