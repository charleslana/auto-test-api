import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserConquestController from '../controller/userConquestController';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';

const userConquestRoute = express.Router();

userConquestRoute
  .route('/')
  .get(authenticateMiddleware, UserConquestController.findAll);

userConquestRoute
  .route('/:id')
  .get(
    idParamMiddleware(),
    authenticateMiddleware,
    UserConquestController.findOne
  );

userConquestRoute
  .route('/by/:id')
  .get(
    idParamMiddleware(),
    authenticateMiddleware,
    UserConquestController.findAllById
  );

export default userConquestRoute;
