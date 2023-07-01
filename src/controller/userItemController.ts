import logger from '../utils/logger';
import UserItemService from '../service/userItemService';
import { NextFunction, Request, Response } from 'express';

export default class UserItemController {
  public static async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get all user items');
    try {
      return response
        .status(200)
        .json(await UserItemService.getAll(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get user item with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await UserItemService.get(id, request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
