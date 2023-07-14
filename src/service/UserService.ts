import bcrypt from 'bcrypt';
import HandlerError from '../handler/HandlerError';
import HandlerSuccess from '../handler/HandlerSuccess';
import IPassword from '../interface/IPassword';
import IRankAndUserList from '../interface/IRankAndUserList';
import IUserAuthenticate from '../interface/IUserAuthenticate';
import IUserPaginated from '../interface/IUserPaginated';
import jwt from 'jsonwebtoken';
import sequelize, { Op, Optional, OrderItem, WhereOptions } from 'sequelize';
import UserItemService from './UserItemService';
import UserModel from '../model/UserModel';
import UserRankEnum from '../enum/UserRankEnum';
import UserRoleModel from '../model/UserRoleModel';
import {
  formatDate,
  formatNumber,
  nameScorePrice,
  randomString,
} from '../utils/utils';

export default class UserService {
  public static async save(model: UserModel): Promise<HandlerSuccess> {
    const count = await UserModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('email')),
        sequelize.fn('lower', model.email)
      ),
    });
    if (count) {
      throw new HandlerError('E-mail já cadastrado.');
    }
    model.password = this.encrypt(model.password as string);
    const user = await UserModel.create(model as Optional<unknown, never>);
    const itemIds = ['1', '2', '3'];
    for (const itemId of itemIds) {
      await UserItemService.save(itemId, user.id);
    }
    return new HandlerSuccess('Usuário criado com sucesso.', 201);
  }

  public static async get(id: string): Promise<UserModel> {
    const find = await UserModel.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ['password', 'authToken'],
      },
      include: [
        {
          model: UserRoleModel,
          as: 'roles',
        },
      ],
    });
    if (!find) {
      throw new HandlerError('Usuário não encontrado.', 404);
    }
    return find;
  }

  public static async updateBounty(
    id: string,
    experience: number,
    score: number
  ): Promise<void> {
    await this.get(id);
    const [, [updatedUser]] = await UserModel.update(
      {
        experience: sequelize.literal(`experience + ${experience}`),
        score: sequelize.literal(`score + ${score}`),
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );
    if (updatedUser) {
      await this.validateUserLevel(updatedUser);
    }
  }

  public static async updateName(model: UserModel): Promise<HandlerSuccess> {
    const find = await this.get(model.id);
    if (find.name != null) {
      throw new HandlerError('Você já atualizou seu nome.', 400);
    }
    await UserService.validateExistUserName(model);
    await UserModel.update(
      {
        name: model.name,
      },
      {
        where: {
          id: model.id,
        },
      }
    );
    return new HandlerSuccess('Nome atualizado com sucesso.');
  }
  public static async updatePassword(
    password: IPassword,
    id: string
  ): Promise<HandlerSuccess> {
    const find = await UserModel.findOne({
      attributes: ['id', 'password'],
      where: {
        id: id,
      },
    });
    if (!find) {
      throw new HandlerError('Usuário não encontrado.', 403);
    }
    if (!this.decrypt(password.currentPassword, find.password)) {
      throw new HandlerError('Senha atual inválida', 400);
    }
    await UserModel.update(
      {
        password: this.encrypt(password.newPassword),
      },
      {
        where: {
          id: find.id,
        },
      }
    );
    return new HandlerSuccess('Senha atualizada com sucesso');
  }

  public static async authenticate(
    email: string,
    password: string
  ): Promise<IUserAuthenticate> {
    const find = await UserModel.findOne({
      attributes: ['id', 'email', 'password', 'banned'],
      where: {
        email: email,
      },
      include: [
        {
          model: UserRoleModel,
          as: 'roles',
        },
      ],
    });
    if (!find) {
      throw new HandlerError(
        'Impossível acessar, verifique e tente novamente.',
        403
      );
    }
    if (!this.decrypt(password, find.password as string)) {
      throw new HandlerError(
        'Impossível acessar, verifique e tente novamente.',
        403
      );
    }
    if (find.banned != null && find.banned > new Date()) {
      throw new HandlerError(
        `Impossível logar, o usuário está banido até ${formatDate(
          find.banned
        )})`,
        403
      );
    }
    const userUpdated = await UserModel.update(
      {
        authToken: randomString(100),
      },
      {
        where: {
          id: find.id,
        },
        returning: true,
      }
    );
    find.authToken = userUpdated[1][0].get().authToken;
    const token = jwt.sign({ user: find }, process.env.TOKEN_SECRET as string, {
      expiresIn: '1d',
    });
    return {
      accessToken: token,
    };
  }

  public static async getAuth(
    id: string,
    authToken: string | null
  ): Promise<UserModel | null> {
    return await UserModel.findOne({
      where: {
        id: id,
        authToken: authToken,
      },
    });
  }

  public static async getRankAndUserList(
    i: IUserPaginated
  ): Promise<IRankAndUserList> {
    const find = await this.get(i.id);
    let userRank = 'Nenhuma classificação';
    let whereOptions: WhereOptions = {
      [sequelize.Op.or]: [
        { level: { [sequelize.Op.gt]: find.level } },
        {
          [sequelize.Op.and]: [
            { level: find.level },
            { id: { [sequelize.Op.lt]: find.id } },
          ],
        },
      ],
      name: {
        [sequelize.Op.ne]: null,
      },
    };
    let orderBy: OrderItem = ['level', 'DESC'];
    if (i.filterType == UserRankEnum.Score) {
      whereOptions = {
        [sequelize.Op.or]: [
          { score: { [sequelize.Op.gt]: find.score } },
          {
            [sequelize.Op.and]: [
              { score: find.score },
              { id: { [sequelize.Op.lt]: find.id } },
            ],
          },
        ],
        name: {
          [sequelize.Op.ne]: null,
        },
      };
      orderBy = ['score', 'DESC'];
    }
    if (find.name) {
      const rank = await UserModel.count({
        where: whereOptions,
      });
      userRank = (rank + 1).toString();
    }
    const offset = (i.page - 1) * i.pageSize;
    const limit = i.pageSize;
    const findAll = await UserModel.findAndCountAll({
      offset,
      limit,
      where: {
        name: {
          [sequelize.Op.ne]: null,
        },
      },
      attributes: {
        exclude: [
          'email',
          'password',
          'authToken',
          'maximumExperience',
          'banned',
        ],
      },
      order: [orderBy, ['id', 'ASC']],
    });
    const totalPages = Math.ceil(findAll.count / i.pageSize);
    if (i.page > totalPages) {
      throw new HandlerError('Nenhum resultado foi encontrado.', 400);
    }
    const hasNextPage = i.page < totalPages;
    return {
      results: findAll.rows,
      rank: userRank,
      totalCount: findAll.count,
      totalPages: totalPages,
      currentPage: i.page,
      hasNextPage: hasNextPage,
    };
  }

  public static async getProfile(id: string): Promise<UserModel> {
    const find = await UserModel.findByPk(id, {
      attributes: {
        exclude: [
          'email',
          'password',
          'authToken',
          'maximumExperience',
          'banned',
        ],
      },
    });
    if (!find) {
      throw new HandlerError('Usuário não encontrado.', 404);
    }
    return find;
  }

  public static async buyNameChange(model: UserModel) {
    const find = await this.get(model.id);
    if (find.score < nameScorePrice) {
      throw new HandlerError(
        `Você não possui a quantidade suficiente para trocar o nome, necessário ${formatNumber(
          nameScorePrice
        )} pontos.`,
        400
      );
    }
    await UserService.validateExistUserName(model);
    if (find.name != model.name) {
      await UserModel.update(
        {
          name: model.name,
          score: sequelize.literal(`score - ${nameScorePrice}`),
        },
        {
          where: {
            id: model.id,
          },
        }
      );
    }
    return new HandlerSuccess('Nome atualizado com sucesso.');
  }

  public static getNameScorePrice() {
    return nameScorePrice;
  }

  public static async reduceScore(id: string, score: number): Promise<void> {
    await UserModel.update(
      {
        score: sequelize.literal(`score - ${score}`),
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  private static async validateExistUserName(model: UserModel) {
    const exist = await UserModel.findOne({
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
      throw new HandlerError('Nome já cadastrado.', 400);
    }
  }

  private static async validateUserLevel(model: UserModel): Promise<void> {
    let { experience, maximumExperience, level } = model;
    while (experience >= maximumExperience) {
      const experienceToSubtract = maximumExperience;
      const newLevel = level + 1;
      experience -= experienceToSubtract;
      level = newLevel;
      const [, [updatedUser]] = await UserModel.update(
        { experience, level },
        { where: { id: model.id }, returning: true }
      );
      maximumExperience = 50 * updatedUser.level;
    }
    model.experience = experience;
    model.maximumExperience = maximumExperience;
    model.level = level;
  }

  private static encrypt(password: string): string {
    const salt = +(process.env.BCRYPT_SALT as string);
    return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt);
  }

  private static decrypt(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(
      `${password}${process.env.BCRYPT_PASSWORD}`,
      hashPassword
    );
  }
}
