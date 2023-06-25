import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserHistoricController from '../controller/userHistoricController';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';

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
  .get(authenticateMiddleware, UserHistoricController.findAll);

export default userHIstoricRoute;
