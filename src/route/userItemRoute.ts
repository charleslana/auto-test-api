import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserItemController from '../controller/UserItemController';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import { userItemValidateTypeMiddleware } from '../middleware/celebrate/userItemCelebrate';

const userItemRoute = express.Router();

userItemRoute
  .route('/')
  .get(authenticateMiddleware, UserItemController.findAll);

userItemRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, UserItemController.findOne);

userItemRoute
  .route('/validate/type')
  .get(
    userItemValidateTypeMiddleware(),
    authenticateMiddleware,
    UserItemController.validateUserItemExistsType
  );

export default userItemRoute;
