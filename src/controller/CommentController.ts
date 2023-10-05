import CommentModel from '../model/CommentModel';
import CommentService from '../service/CommentService';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';

export default class CommentController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create comment ${JSON.stringify(request.body)}`);
    try {
      const comment = request.body as CommentModel;
      comment.userId = request.user.id;
      const handler = await CommentService.save(comment);
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
    logger.info(`Update comment with ${JSON.stringify(request.body)}`);
    try {
      const post = request.body as CommentModel;
      post.userId = request.user.id;
      const handler = await CommentService.update(post);
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
    logger.info(`Get comment with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await CommentService.get(id, request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async findPaginated(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get pagination comment from page ${request.query.page}`);
    try {
      const { page, postId } = request.query;
      return response.status(200).json(
        await CommentService.getPaginated({
          page: page != undefined ? +page : 1,
          pageSize: 10,
          postId: postId as string,
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
    logger.info(`Delete comment with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const app = await CommentService.delete(id, request.user.id);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get all comments with user id ${request.user.id}`);
    try {
      return response
        .status(200)
        .json(await CommentService.getAll(request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
