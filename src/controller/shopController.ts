import logger from '../utils/logger';
import ShopModel from '../model/shopModel';
import ShopService from '../service/shopService';
import { NextFunction, Request, Response } from 'express';

export default class ShopController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create shop ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ShopModel;
      const handler = await ShopService.save(data);
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
    logger.info('Get all shops');
    try {
      return response.status(200).json(await ShopService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get shop with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await ShopService.get(id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update shop ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ShopModel;
      const handler = await ShopService.update(data);
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
    logger.info(`Delete shop with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const handler = await ShopService.delete(id);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async buy(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Buy item shop with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const handler = await ShopService.buyItemShop(id, request.user.id);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
