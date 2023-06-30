import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import OpenaiController from '../controller/openaiController';
import {
  openaiSendMiddleware,
  escapeOpenaiHTMLMiddleware,
} from '../middleware/celebrate/openaiCelebrate';

const openaiRoute = express.Router();

openaiRoute
  .route('/')
  .post(
    openaiSendMiddleware(),
    escapeOpenaiHTMLMiddleware,
    authenticateMiddleware,
    OpenaiController.send
  );

export default openaiRoute;
