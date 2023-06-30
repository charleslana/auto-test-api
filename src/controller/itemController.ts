import ItemModel from '../model/itemModel';
import ItemService from '../service/itemService';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';

export default class ItemController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create item ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ItemModel;
      const handler = await ItemService.save(data);
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
    logger.info('Get all items');
    try {
      return response.status(200).json(await ItemService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get item with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await ItemService.get(id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update item ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ItemModel;
      const handler = await ItemService.update(data);
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
    logger.info(`Delete item with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const handler = await ItemService.delete(id);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
