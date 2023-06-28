import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import IHistoric from '../interface/IHistoric';
import IHistoricPaginated from '../interface/IHistoricPaginated';
import UserHistoricModel from '../model/userHistoricModel';
import { Optional, WhereOptions } from 'sequelize';

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

  public static async getPaginated(i: IHistoricPaginated): Promise<IHistoric> {
    const offset = (i.page - 1) * i.pageSize;
    const limit = i.pageSize;
    let whereOptions: WhereOptions = {
      userId: i.userId,
    };
    if (i.filterType != null) {
      whereOptions = {
        userId: i.userId,
        type: i.filterType,
      };
    }
    const findAll = await UserHistoricModel.findAndCountAll({
      offset,
      limit,
      where: whereOptions,
      order: [
        ['id', 'DESC'],
        ['created_at', 'DESC'],
      ],
    });
    const totalPages = Math.ceil(findAll.count / i.pageSize);
    if (i.page > totalPages) {
      throw new HandlerError('Nenhum resultado foi encontrado.', 400);
    }
    const hasNextPage = i.page < totalPages;
    return {
      results: findAll.rows,
      totalCount: findAll.count,
      totalPages: totalPages,
      currentPage: i.page,
      hasNextPage: hasNextPage,
    };
  }

  public static async delete(
    id: string,
    userId: string
  ): Promise<HandlerSuccess> {
    await this.get(id, userId);
    await UserHistoricModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Histórico excluído com sucesso.');
  }
}
