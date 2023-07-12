import TestTypeEnum from '../../enum/TestTypeEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const userHistoricPageMiddleware = () => {
  return celebrate(
    {
      [Segments.QUERY]: {
        page: Joi.number().min(1),
        filterType: Joi.string().valid(...Object.values(TestTypeEnum)),
      },
    },
    { abortEarly: false }
  );
};
