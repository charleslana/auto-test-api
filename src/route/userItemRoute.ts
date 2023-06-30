import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import roleMiddleware from '../middleware/roleMiddleware';
import UserItemController from '../controller/userItemController';
import UserRoleEnum from '../enum/userRoleEnum';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import { userItemCreateMiddleware } from '../middleware/celebrate/userItemCelebrate';

const userItemRoute = express.Router();

userItemRoute
  .route('/')
  .post(
    userItemCreateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    UserItemController.create
  );

userItemRoute
  .route('/')
  .get(authenticateMiddleware, UserItemController.findAll);

userItemRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, UserItemController.findOne);

export default userItemRoute;
