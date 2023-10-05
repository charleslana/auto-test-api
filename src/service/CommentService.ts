import CommentModel from '../model/CommentModel';
import HandlerError from '../handler/HandlerError';
import HandlerSuccess from '../handler/HandlerSuccess';
import IComment from '../interface/IComment';
import IPage from '../interface/IPage';
import PostService from './PostService';
import UserModel from '../model/UserModel';
import { Optional } from 'sequelize';

export default class CommentService {
  public static async save(model: CommentModel): Promise<HandlerSuccess> {
    const post = await PostService.get(model.postId);
    if (!post.enable) {
      throw new HandlerError(
        'Postagem não está disponível para comentários',
        400
      );
    }
    await CommentModel.create(model as Optional<unknown, never>);
    return new HandlerSuccess('Comentário enviado com sucesso.', 201);
  }

  public static async get(id: string, userId: string): Promise<CommentModel> {
    const find = await CommentModel.findOne({
      where: {
        id: id,
        userId: userId,
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
      throw new HandlerError('Comentário não encontrado.', 404);
    }
    return find;
  }

  public static async getPaginated(i: IComment): Promise<IPage<CommentModel>> {
    const offset = (i.page - 1) * i.pageSize;
    const limit = i.pageSize;
    const findAll = await this.findByOffsetAndLimitAndPostId(
      offset,
      limit,
      i.postId
    );
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

  public static async update(model: CommentModel): Promise<HandlerSuccess> {
    await this.get(model.id, model.userId);
    await CommentModel.update(model as Optional<unknown, never>, {
      where: {
        id: model.id,
      },
    });
    return new HandlerSuccess('Comentário atualizado com sucesso.');
  }

  public static async delete(
    id: string,
    userId: string
  ): Promise<HandlerSuccess> {
    await this.get(id, userId);
    await CommentModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Comentário excluído com sucesso.');
  }

  private static async findByOffsetAndLimitAndPostId(
    offset: number,
    limit: number,
    postId: string
  ): Promise<{ rows: CommentModel[]; count: number }> {
    const findAll = await CommentModel.findAndCountAll({
      offset,
      limit,
      where: {
        postId: postId,
      },
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
