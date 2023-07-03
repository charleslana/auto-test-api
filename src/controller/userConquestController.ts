import logger from '../utils/logger';
import UserConquestService from '../service/userConquestService';
import { NextFunction, Request, Response } from 'express';

export default class UserConquestController {
  public static async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get all user conquests');
    try {
      return response
        .status(200)
        .json(await UserConquestService.getAll(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get user conquest with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await UserConquestService.get(id, request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
