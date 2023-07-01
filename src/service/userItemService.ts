import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import ItemModel from '../model/itemModel';
import ItemService from './itemService';
import UserItemModel from '../model/userItemModel';
import { Op } from 'sequelize';

export default class UserItemService {
  public static async save(
    itemId: string,
    userId: string
  ): Promise<HandlerSuccess> {
    const item = await ItemService.getItemById(itemId);
    await this.existUserItemByUserId(itemId, userId);
    let expirationDate: Date | null = null;
    if (item.expiryDay !== null) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + item.expiryDay);
      expirationDate = currentDate;
    }
    await UserItemModel.create({
      userId: userId,
      itemId: itemId,
      expirationDate: expirationDate,
    });
    return new HandlerSuccess('Item do usuário criado com sucesso', 201);
  }

  public static async getAll(userId: string) {
    return await UserItemModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: ItemModel,
          as: 'item',
        },
      ],
    });
  }

  public static async get(id: string, userId: string) {
    const exist = await UserItemModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: [
        {
          model: ItemModel,
          as: 'item',
        },
      ],
    });
    if (!exist) {
      throw new HandlerError('Item do usuário não encontrado', 404);
    }
    return exist;
  }

  public static async deleteExpiredItems(): Promise<void> {
    const currentDate = new Date();
    await UserItemModel.destroy({
      where: {
        expirationDate: {
          [Op.and]: [{ [Op.lt]: currentDate }, { [Op.not]: null }],
        },
      },
    });
  }

  private static async existUserItemByUserId(
    itemId: string,
    userId: string
  ): Promise<void> {
    const count = await UserItemModel.count({
      where: {
        userId: userId,
        itemId: itemId,
      },
    });
    if (count) {
      throw new HandlerError('Já existe o item na conta do usuário', 400);
    }
  }
}
