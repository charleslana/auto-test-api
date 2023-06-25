import logger from '../utils/logger';
import UserHistoricService from '../service/userHistoricService';
import { NextFunction, Request, Response } from 'express';

export default class UserHistoricController {
  public static async find(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get user historic with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await UserHistoricService.get(id, request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get all user historic with user ${request.user.id}`);
    try {
      return response
        .status(200)
        .json(await UserHistoricService.getAll(request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
