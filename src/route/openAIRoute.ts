import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import OpenAIController from '../controller/OpenAIController';
import {
  openAISendMiddleware,
  escapeOpenAiHTMLMiddleware,
} from '../middleware/celebrate/openAICelebrate';

const openAIRoute = express.Router();

openAIRoute
  .route('/')
  .post(
    openAISendMiddleware(),
    escapeOpenAiHTMLMiddleware,
    authenticateMiddleware,
    OpenAIController.send
  );

export default openAIRoute;
