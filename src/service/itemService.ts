import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import ItemModel from '../model/itemModel';
import sequelize, { Op, Optional } from 'sequelize';

export default class ItemService {
  public static async save(model: ItemModel): Promise<HandlerSuccess> {
    const count = await ItemModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', model.name)
      ),
    });
    if (count) {
      throw new HandlerError('Nome do item já existe', 400);
    }
    await ItemModel.create(model as Optional<unknown, never>);
    return new HandlerSuccess('Item criado com sucesso', 201);
  }

  public static async getAll(): Promise<ItemModel[]> {
    return await ItemModel.findAll();
  }

  public static async get(id: string): Promise<ItemModel> {
    return await this.getItemById(id);
  }

  public static async update(model: ItemModel): Promise<HandlerSuccess> {
    await this.getItemById(model.id);
    const exist = await ItemModel.findOne({
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
      throw new HandlerError('Nome do item já existe', 400);
    }
    await ItemModel.update(model as Optional<unknown, never>, {
      where: {
        id: model.id,
      },
    });
    return new HandlerSuccess('Item atualizado com sucesso');
  }

  public static async delete(id: string): Promise<HandlerSuccess> {
    await this.getItemById(id);
    await ItemModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Item excluído com sucesso');
  }

  public static async getItemById(id: string): Promise<ItemModel> {
    const exist = await ItemModel.findOne({
      where: {
        id: id,
      },
    });
    if (!exist) {
      throw new HandlerError('Item não encontrado', 404);
    }
    return exist;
  }
}
