import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserItemController from '../controller/userItemController';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';

const userItemRoute = express.Router();

userItemRoute
  .route('/')
  .get(authenticateMiddleware, UserItemController.findAll);

userItemRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, UserItemController.findOne);

export default userItemRoute;
