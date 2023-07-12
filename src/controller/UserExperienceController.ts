import logger from '../utils/logger';
import UserExperienceService from '../service/UserExperienceService';
import { NextFunction, Request, Response } from 'express';

export default class UserExperienceController {
  public static async getExperienceCountByType(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get user experience count by type');
    try {
      return response
        .status(200)
        .json(
          await UserExperienceService.getExperienceCountByType(request.user.id)
        );
    } catch (error) {
      next(error);
    }
  }

  public static async getCountByType(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get user count by type');
    try {
      return response
        .status(200)
        .json(await UserExperienceService.getCountByType(request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
