import ISendOpenai from '../interface/ISendOpenai';
import logger from '../utils/logger';
import OpenaiService from '../service/openaiService';
import { NextFunction, Request, Response } from 'express';

export default class OpenaiController {
  public static async send(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Send message from openai ${JSON.stringify(request.body)}`);
    try {
      const sendOpenai = request.body as ISendOpenai;
      return response
        .status(200)
        .json(await OpenaiService.send(sendOpenai, request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
