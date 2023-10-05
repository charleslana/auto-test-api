import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import PostController from '../controller/PostController';
import roleMiddleware from '../middleware/roleMiddleware';
import UserRoleEnum from '../enum/UserRoleEnum';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import { pageMiddleware } from '../middleware/celebrate/pageCelebrate';
import {
  postCreateMiddleware,
  postUpdateMiddleware,
  searchPostMiddleware,
} from '../middleware/celebrate/postCelebrate';

const postRoute = express.Router();

postRoute
  .route('/')
  .post(
    postCreateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    PostController.create
  );

postRoute.route('/').get(pageMiddleware(), PostController.findPaginated);

postRoute.route('/:id').get(idParamMiddleware(), PostController.findOne);

postRoute
  .route('/')
  .put(
    postUpdateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    PostController.update
  );

postRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    PostController.delete
  );

postRoute
  .route('/search/by')
  .get(searchPostMiddleware(), PostController.searchByTitle);

export default postRoute;
