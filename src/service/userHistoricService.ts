import HandlerError from '../handler/handlerError';
import IHistoric from '../interface/IHistoric';
import UserHistoricModel from '../model/userHistoricModel';
import { Optional } from 'sequelize';

export default class UserHistoricService {
  public static async save(model: UserHistoricModel): Promise<void> {
    await UserHistoricModel.create(model as Optional<unknown, never>);
  }

  public static async get(
    id: string,
    userId: string
  ): Promise<UserHistoricModel> {
    const find = await UserHistoricModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!find) {
      throw new HandlerError('Histórico não encontrado.', 404);
    }
    return find;
  }

  public static async getPaginated(
    page: number,
    pageSize: number,
    userId: string
  ): Promise<IHistoric> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const findAll = await UserHistoricModel.findAndCountAll({
      offset,
      limit,
      where: {
        userId: userId,
      },
      order: [
        ['id', 'DESC'],
        ['created_at', 'DESC'],
      ],
    });
    const totalPages = Math.ceil(findAll.count / pageSize);
    if (page > totalPages) {
      throw new HandlerError('Nenhum resultado foi encontrado.', 400);
    }
    const hasNextPage = page < totalPages;
    return {
      results: findAll.rows,
      totalCount: findAll.count,
      totalPages: totalPages,
      currentPage: page,
      hasNextPage: hasNextPage,
    };
  }
}
