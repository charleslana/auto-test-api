import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserHistoricController from '../controller/userHistoricController';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import { userHistoricPageMiddleware } from '../middleware/celebrate/userHistoricCelebrate';

const userHIstoricRoute = express.Router();

userHIstoricRoute
  .route('/:id')
  .get(
    idParamMiddleware(),
    authenticateMiddleware,
    UserHistoricController.find
  );

userHIstoricRoute
  .route('/')
  .get(
    userHistoricPageMiddleware(),
    authenticateMiddleware,
    UserHistoricController.findPaginated
  );

export default userHIstoricRoute;
