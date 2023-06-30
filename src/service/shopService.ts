import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import ItemModel from '../model/itemModel';
import ItemService from './itemService';
import ShopModel from '../model/shopModel';
import UserItemService from './userItemService';
import UserService from './userService';
import { formatNumber } from '../utils/utils';
import { Optional } from 'sequelize';

export default class ShopService {
  public static async save(model: ShopModel): Promise<HandlerSuccess> {
    await ItemService.getItemById(model.itemId);
    await this.existShopItemByItemId(model.itemId);
    await ShopModel.create(model as Optional<unknown, never>);
    return new HandlerSuccess('Item da loja criado com sucesso', 201);
  }

  public static async getAll(): Promise<ShopModel[]> {
    return await ShopModel.findAll({
      include: [
        {
          model: ItemModel,
          as: 'item',
        },
      ],
    });
  }

  public static async get(id: string): Promise<ShopModel> {
    return await this.getShopById(id);
  }

  public static async update(shop: ShopModel): Promise<HandlerSuccess> {
    await this.getShopById(shop.id);
    await ItemService.getItemById(shop.itemId);
    await ShopModel.update(shop as Optional<unknown, never>, {
      where: {
        id: shop.id,
      },
    });
    return new HandlerSuccess('Item da loja atualizado com sucesso');
  }

  public static async delete(id: string): Promise<HandlerSuccess> {
    await this.getShopById(id);
    await ShopModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Item da loja excluído com sucesso');
  }

  public static async buyItemShop(
    id: string,
    userId: string
  ): Promise<HandlerSuccess> {
    const shop = await this.getShopById(id);
    const user = await UserService.get(userId);
    if (user.score < shop.score) {
      throw new HandlerError(
        `Você não possui a quantidade suficiente, necessário ${formatNumber(
          shop.score
        )} score.`,
        400
      );
    }
    await UserItemService.save(shop.itemId, userId);
    await UserService.reduceScore(userId, shop.score);
    return new HandlerSuccess('Item comprado com sucesso');
  }

  private static async getShopById(id: string): Promise<ShopModel> {
    const exist = await ShopModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: ItemModel,
          as: 'item',
        },
      ],
    });
    if (!exist) {
      throw new HandlerError('Item da loja não encontrado', 404);
    }
    return exist;
  }

  private static async existShopItemByItemId(itemId: string): Promise<void> {
    const count = await ShopModel.count({
      where: {
        itemId: itemId,
      },
    });
    if (count) {
      throw new HandlerError('Já existe o item na loja', 400);
    }
  }
}
