import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import roleMiddleware from '../middleware/roleMiddleware';
import ShopController from '../controller/ShopController';
import UserRoleEnum from '../enum/UserRoleEnum';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import {
  shopCreateMiddleware,
  shopUpdateMiddleware,
} from '../middleware/celebrate/shopCelebrate';

const shopRoute = express.Router();

shopRoute
  .route('/')
  .post(
    shopCreateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ShopController.create
  );

shopRoute.route('/').get(authenticateMiddleware, ShopController.findAll);

shopRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, ShopController.findOne);

shopRoute
  .route('/')
  .put(
    shopUpdateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ShopController.update
  );

shopRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ShopController.delete
  );

shopRoute
  .route('/buy/:id')
  .post(idParamMiddleware(), authenticateMiddleware, ShopController.buy);

export default shopRoute;
