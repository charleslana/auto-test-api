import ConquestModel from '../model/ConquestModel';
import HandlerError from '../handler/HandlerError';
import HandlerSuccess from '../handler/HandlerSuccess';
import sequelize, { Op, Optional } from 'sequelize';

export default class ConquestService {
  public static async save(model: ConquestModel): Promise<HandlerSuccess> {
    const count = await ConquestModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', model.name)
      ),
    });
    if (count) {
      throw new HandlerError('Nome da conquista já existe', 400);
    }
    await ConquestModel.create(model as Optional<unknown, never>);
    return new HandlerSuccess('Conquista criada com sucesso', 201);
  }

  public static async getAll(): Promise<ConquestModel[]> {
    return await ConquestModel.findAll({
      order: [
        ['experience', 'ASC'],
        ['id', 'DESC'],
      ],
    });
  }

  public static async get(id: string): Promise<ConquestModel> {
    return await this.getConquestById(id);
  }

  public static async update(model: ConquestModel): Promise<HandlerSuccess> {
    await this.getConquestById(model.id);
    const exist = await ConquestModel.findOne({
      where: {
        name: sequelize.where(
          sequelize.fn('lower', sequelize.col('name')),
          sequelize.fn('lower', model.name)
        ),
        id: {
          [Op.not]: model.id,
        },
      },
    });
    if (exist) {
      throw new HandlerError('Nome da conquista já existe', 400);
    }
    await ConquestModel.update(model as Optional<unknown, never>, {
      where: {
        id: model.id,
      },
    });
    return new HandlerSuccess('Conquista atualizada com sucesso');
  }

  public static async delete(id: string): Promise<HandlerSuccess> {
    await this.getConquestById(id);
    await ConquestModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Conquista excluída com sucesso');
  }

  public static async getConquestById(id: string): Promise<ConquestModel> {
    const exist = await ConquestModel.findOne({
      where: {
        id: id,
      },
    });
    if (!exist) {
      throw new HandlerError('Conquista não encontrada', 404);
    }
    return exist;
  }
}
