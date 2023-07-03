import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserController from '../controller/userController';
import UserExperienceController from '../controller/userExperienceController';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import {
  userCreateMiddleware,
  userLoginMiddleware,
  userPageMiddleware,
  userPasswordMiddleware,
  userUpdateNameMiddleware,
} from '../middleware/celebrate/userCelebrate';

const userRoute = express.Router();

userRoute.route('/').post(userCreateMiddleware(), UserController.create);

userRoute.route('/auth').post(userLoginMiddleware(), UserController.auth);

userRoute
  .route('/details')
  .get(authenticateMiddleware, UserController.getDetails);

userRoute
  .route('/change-name')
  .put(
    userUpdateNameMiddleware(),
    authenticateMiddleware,
    UserController.changeName
  );

userRoute
  .route('/change-password')
  .put(
    userPasswordMiddleware(),
    authenticateMiddleware,
    UserController.changePassword
  );

userRoute
  .route('/')
  .get(
    userPageMiddleware(),
    authenticateMiddleware,
    UserController.findPaginated
  );

userRoute
  .route('/profile/:id')
  .get(idParamMiddleware(), authenticateMiddleware, UserController.getProfile);

userRoute
  .route('/buy-name')
  .put(
    userUpdateNameMiddleware(),
    authenticateMiddleware,
    UserController.buyNameChange
  );

userRoute
  .route('/test/experience')
  .get(
    authenticateMiddleware,
    UserExperienceController.getExperienceCountByType
  );

userRoute
  .route('/test/count')
  .get(authenticateMiddleware, UserExperienceController.getCountByType);

export default userRoute;
