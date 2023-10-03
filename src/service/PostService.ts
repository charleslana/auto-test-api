import HandlerError from '../handler/HandlerError';
import HandlerSuccess from '../handler/HandlerSuccess';
import IPage from '../interface/IPage';
import IPaginated from '../interface/IPaginated';
import PostModel from '../model/PostModel';
import UserModel from '../model/UserModel';
import { Optional } from 'sequelize';

export default class PostService {
  public static async save(model: PostModel): Promise<HandlerSuccess> {
    await PostModel.create(model as Optional<unknown, never>);
    return new HandlerSuccess('Postagem criada com sucesso.', 201);
  }

  public static async get(id: string): Promise<PostModel> {
    const find = await PostModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
    if (!find) {
      throw new HandlerError('Postagem não encontrada.', 404);
    }
    return find;
  }

  public static async getPaginated(i: IPaginated): Promise<IPage<PostModel>> {
    const offset = (i.page - 1) * i.pageSize;
    const limit = i.pageSize;
    const findAll = await this.findByOffsetAndLimit(offset, limit);
    const totalPages = Math.ceil(findAll.count / i.pageSize);
    const hasNextPage = i.page < totalPages;
    return {
      results: findAll.rows,
      totalCount: findAll.count,
      totalPages,
      currentPage: i.page,
      hasNextPage,
    };
  }

  public static async update(model: PostModel): Promise<HandlerSuccess> {
    await this.get(model.id);
    await PostModel.update(model as Optional<unknown, never>, {
      where: {
        id: model.id,
      },
    });
    return new HandlerSuccess('Postagem atualizada com sucesso.');
  }

  public static async delete(id: string): Promise<HandlerSuccess> {
    await this.get(id);
    await PostModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Postagem excluída com sucesso.');
  }

  private static async findByOffsetAndLimit(
    offset: number,
    limit: number
  ): Promise<{ rows: PostModel[]; count: number }> {
    const findAll = await PostModel.findAndCountAll({
      offset,
      limit,
      order: [
        ['id', 'DESC'],
        ['created_at', 'DESC'],
      ],
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
    return { rows: findAll.rows, count: findAll.count };
  }
}
