import fs from 'fs';
import logger from '../utils/logger';
import TestTypeEnum from '../enum/TestTypeEnum';
import UserHistoricService from '../service/UserHistoricService';
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

  public static async findPaginated(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(
      `Get paginate user historic with user ${request.user.id} page ${request.query.page}`
    );
    try {
      const { page, filterType } = request.query;
      return response.status(200).json(
        await UserHistoricService.getPaginated({
          page: page != undefined ? +page : 1,
          pageSize: 10,
          userId: request.user.id,
          filterType: filterType as TestTypeEnum,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Delete historic with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const app = await UserHistoricService.delete(id, request.user.id);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async exportToExcel(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Export user history in Excel with id ${request.user.id}`);
    try {
      const { filePath, fileName } = await UserHistoricService.exportToExcel(
        request.user.id
      );
      response.download(filePath, fileName, err => {
        if (err) {
          logger.info('Error downloading file:', err);
        } else {
          logger.info('File downloaded successfully!');
          fs.unlinkSync(filePath);
          logger.info(`Deleted file: ${filePath}`);
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
