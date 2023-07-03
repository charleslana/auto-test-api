import authenticateMiddleware from '../middleware/authenticateMiddleware';
import ConquestController from '../controller/conquestController';
import express from 'express';
import roleMiddleware from '../middleware/roleMiddleware';
import UserRoleEnum from '../enum/userRoleEnum';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import {
  conquestCreateMiddleware,
  conquestUpdateMiddleware,
  escapeConquestHTMLMiddleware,
} from '../middleware/celebrate/conquestCelebrate';

const conquestRoute = express.Router();

conquestRoute
  .route('/')
  .post(
    conquestCreateMiddleware(),
    escapeConquestHTMLMiddleware,
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ConquestController.create
  );

conquestRoute
  .route('/')
  .get(authenticateMiddleware, ConquestController.findAll);

conquestRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, ConquestController.findOne);

conquestRoute
  .route('/')
  .put(
    conquestUpdateMiddleware(),
    escapeConquestHTMLMiddleware,
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ConquestController.update
  );

conquestRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ConquestController.delete
  );

export default conquestRoute;
