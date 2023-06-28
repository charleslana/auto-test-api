import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import OpenaiController from '../controller/openaiController';
import {
  openaiSendMiddleware,
  escapeTagsHTMLMiddleware,
} from '../middleware/celebrate/openaiCelebrate';

const openaiRoute = express.Router();

openaiRoute
  .route('/')
  .post(
    openaiSendMiddleware(),
    escapeTagsHTMLMiddleware,
    authenticateMiddleware,
    OpenaiController.send
  );

export default openaiRoute;
