import ConquestModel from '../model/conquestModel';
import ConquestService from './conquestService';
import HandlerError from '../handler/handlerError';
import UserConquestModel from '../model/userConquestModel';
import UserExperienceService from './userExperienceService';

export default class UserConquestService {
  public static async addNewConquests(userId: string): Promise<void> {
    const allConquests = await ConquestService.getAll();
    for (const conquest of allConquests) {
      if (!(await this.existUserConquestByUserId(conquest.id, userId))) {
        if (await this.hasRequiredExperience(userId, conquest)) {
          await this.save(conquest.id, userId);
        }
      }
    }
  }

  public static async getAll(userId: string) {
    return await UserConquestModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: ConquestModel,
          as: 'conquest',
        },
      ],
    });
  }

  public static async get(id: string, userId: string) {
    const exist = await UserConquestModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: [
        {
          model: ConquestModel,
          as: 'conquest',
        },
      ],
    });
    if (!exist) {
      throw new HandlerError('Conquista do usuário não encontrado', 404);
    }
    return exist;
  }

  private static async save(conquestId: string, userId: string): Promise<void> {
    await UserConquestModel.create({
      userId: userId,
      conquestId: conquestId,
    });
  }

  private static async existUserConquestByUserId(
    conquestId: string,
    userId: string
  ): Promise<boolean> {
    const count = await UserConquestModel.count({
      where: {
        conquestId: conquestId,
        userId: userId,
      },
    });
    if (count) {
      return true;
    }
    return false;
  }

  private static async hasRequiredExperience(
    userId: string,
    model: ConquestModel
  ): Promise<boolean> {
    const experienceCounts =
      await UserExperienceService.getExperienceCountByType(userId);
    const hasTypeExperience = model.type in experienceCounts;
    const experience = experienceCounts[model.type];
    if (hasTypeExperience && experience >= model.experience) {
      return true;
    }
    return false;
  }
}
