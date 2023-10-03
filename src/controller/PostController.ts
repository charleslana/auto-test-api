import logger from '../utils/logger';
import PostModel from '../model/PostModel';
import PostService from '../service/PostService';
import { NextFunction, Request, Response } from 'express';

export default class PostController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create post ${JSON.stringify(request.body)}`);
    try {
      const post = request.body as PostModel;
      post.userId = request.user.id;
      const handler = await PostService.save(post);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update user name with ${JSON.stringify(request.body.name)}`);
    try {
      const post = request.body as PostModel;
      post.userId = request.user.id;
      const handler = await PostService.update(post);
      return handler.toJSON(response);
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
      return response.status(200).json(await PostService.get(id));
    } catch (error) {
      next(error);
    }
  }

  public static async findPaginated(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get pagination post from page ${request.query.page}`);
    try {
      const { page } = request.query;
      return response.status(200).json(
        await PostService.getPaginated({
          page: page != undefined ? +page : 1,
          pageSize: 10,
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
    logger.info(`Delete post with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const app = await PostService.delete(id);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
