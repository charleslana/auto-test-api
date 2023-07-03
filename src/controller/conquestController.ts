import ConquestModel from '../model/conquestModel';
import ConquestService from '../service/conquestService';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';

export default class ConquestController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create conquest ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ConquestModel;
      const handler = await ConquestService.save(data);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    _request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get all conquests');
    try {
      return response.status(200).json(await ConquestService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get conquest with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await ConquestService.get(id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update conquest ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ConquestModel;
      const handler = await ConquestService.update(data);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Delete conquest with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const handler = await ConquestService.delete(id);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
