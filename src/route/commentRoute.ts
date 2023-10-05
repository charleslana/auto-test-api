import authenticateMiddleware from '../middleware/authenticateMiddleware';
import CommentController from '../controller/CommentController';
import express from 'express';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import {
  commentCreateMiddleware,
  commentPageMiddleware,
  commentUpdateMiddleware,
  escapeCommentHTMLMiddleware,
} from '../middleware/celebrate/commentCelebrate';

const commentRoute = express.Router();

commentRoute
  .route('/')
  .post(
    commentCreateMiddleware(),
    escapeCommentHTMLMiddleware,
    authenticateMiddleware,
    CommentController.create
  );

commentRoute
  .route('/')
  .get(commentPageMiddleware(), CommentController.findPaginated);

commentRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, CommentController.findOne);

commentRoute
  .route('/')
  .put(
    commentUpdateMiddleware(),
    escapeCommentHTMLMiddleware,
    authenticateMiddleware,
    CommentController.update
  );

commentRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    CommentController.delete
  );

export default commentRoute;
