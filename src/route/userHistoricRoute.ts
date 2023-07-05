import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserHistoricController from '../controller/userHistoricController';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import { userHistoricPageMiddleware } from '../middleware/celebrate/userHistoricCelebrate';

const userHistoricRoute = express.Router();

userHistoricRoute
  .route('/:id')
  .get(
    idParamMiddleware(),
    authenticateMiddleware,
    UserHistoricController.find
  );

userHistoricRoute
  .route('/')
  .get(
    userHistoricPageMiddleware(),
    authenticateMiddleware,
    UserHistoricController.findPaginated
  );

userHistoricRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    UserHistoricController.delete
  );

userHistoricRoute
  .route('/export/xlsx')
  .get(authenticateMiddleware, UserHistoricController.exportToExcel);

export default userHistoricRoute;
