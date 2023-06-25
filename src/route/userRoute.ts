import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserController from '../controller/userController';
import {
  userCreateMiddleware,
  userLoginMiddleware,
  userUpdateNameMiddleware,
} from '../middleware/celebrate/userCelebrate';

const userRoute = express.Router();

userRoute.route('/').post(userCreateMiddleware(), UserController.create);

userRoute.route('/auth').post(userLoginMiddleware(), UserController.auth);

userRoute.route('/details').get(authenticateMiddleware, UserController.find);

userRoute
  .route('/change-name')
  .put(
    userUpdateNameMiddleware(),
    authenticateMiddleware,
    UserController.changeName
  );

export default userRoute;
