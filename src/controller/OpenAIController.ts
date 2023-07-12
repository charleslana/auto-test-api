import ISendOpenAI from '../interface/ISendOpenAI';
import logger from '../utils/logger';
import OpenAIService from '../service/OpenAIService';
import { NextFunction, Request, Response } from 'express';

export default class OpenAIController {
  public static async send(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Send message from openAI ${JSON.stringify(request.body)}`);
    try {
      const sendOpenAI = request.body as ISendOpenAI;
      return response
        .status(200)
        .json(await OpenAIService.send(sendOpenAI, request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
