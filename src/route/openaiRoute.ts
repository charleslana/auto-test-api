import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import OpenaiController from '../controller/openaiController';
import { openaiSendMiddleware } from '../middleware/celebrate/openaiCelebrate';

const openaiRoute = express.Router();

openaiRoute
  .route('/')
  .post(openaiSendMiddleware(), authenticateMiddleware, OpenaiController.send);

export default openaiRoute;
