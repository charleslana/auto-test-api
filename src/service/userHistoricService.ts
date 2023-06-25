import HandlerError from '../handler/handlerError';
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

  public static async getAll(userId: string): Promise<UserHistoricModel[]> {
    return await UserHistoricModel.findAll({
      where: {
        userId: userId,
      },
    });
  }
}
