import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import ItemController from '../controller/ItemController';
import roleMiddleware from '../middleware/roleMiddleware';
import UserRoleEnum from '../enum/UserRoleEnum';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import {
  escapeItemHTMLMiddleware,
  itemCreateMiddleware,
  itemUpdateMiddleware,
} from '../middleware/celebrate/itemCelebrate';

const itemRoute = express.Router();

itemRoute
  .route('/')
  .post(
    itemCreateMiddleware(),
    escapeItemHTMLMiddleware,
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ItemController.create
  );

itemRoute.route('/').get(authenticateMiddleware, ItemController.findAll);

itemRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, ItemController.findOne);

itemRoute
  .route('/')
  .put(
    itemUpdateMiddleware(),
    escapeItemHTMLMiddleware,
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ItemController.update
  );

itemRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    ItemController.delete
  );

export default itemRoute;
