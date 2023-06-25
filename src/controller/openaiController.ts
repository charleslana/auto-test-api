import logger from '../utils/logger';
import OpenaiService from '../service/openaiService';
import { NextFunction, Request, Response } from 'express';

export default class OpenaiController {
  public static async send(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(
      `Send message from openai ${JSON.stringify(request.body.content)}`
    );
    try {
      const { content } = request.body;
      return response
        .status(200)
        .json(await OpenaiService.send(content, request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
