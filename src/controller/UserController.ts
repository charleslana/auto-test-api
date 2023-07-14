import logger from '../utils/logger';
import UserModel from '../model/UserModel';
import UserRankEnum from '../enum/UserRankEnum';
import UserService from '../service/UserService';
import { NextFunction, Request, Response } from 'express';

export default class UserController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create user ${JSON.stringify(request.body.email)}`);
    try {
      const user = request.body as UserModel;
      const handler = await UserService.save(user);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async changeName(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update user name with ${JSON.stringify(request.body.name)}`);
    try {
      const { name } = request.body;
      const model = <UserModel>{};
      model.id = request.user.id;
      model.name = name;
      const handler = await UserService.updateName(model);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async getDetails(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get user data ${request.user.id}`);
    try {
      return response.status(200).json(await UserService.get(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async auth(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Authenticate user ${request.body.email}`);
    try {
      const { email, password } = request.body;
      return response
        .status(200)
        .json(await UserService.authenticate(email, password));
    } catch (error) {
      next(error);
    }
  }

  public static async changePassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update user password ${request.user.id}`);
    try {
      const { currentPassword, newPassword } = request.body;
      const handler = await UserService.updatePassword(
        {
          currentPassword,
          newPassword,
        },
        request.user.id
      );
      return handler.toJSON(response);
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
      `Get paginate user ${request.user.id} page ${request.query.page}`
    );
    try {
      const { page, filterType } = request.query;
      return response.status(200).json(
        await UserService.getRankAndUserList({
          page: page != undefined ? +page : 1,
          pageSize: 10,
          id: request.user.id,
          filterType: filterType as UserRankEnum,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  public static async getProfile(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get user profile with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await UserService.getProfile(id));
    } catch (error) {
      next(error);
    }
  }

  public static async buyNameChange(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(
      `Buy user name change with name ${JSON.stringify(request.body.name)}`
    );
    try {
      const { name } = request.body;
      const model = <UserModel>{};
      model.id = request.user.id;
      model.name = name;
      const handler = await UserService.buyNameChange(model);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static getNameScorePrice(
    _request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get name score price');
    try {
      return response.status(200).json(UserService.getNameScorePrice());
    } catch (error) {
      next(error);
    }
  }
}
