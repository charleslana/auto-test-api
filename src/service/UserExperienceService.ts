import IUserExperience from '../interface/IUserExperience';
import TestTypeEnum from '../enum/TestTypeEnum';
import UserExperienceModel from '../model/UserExperienceModel';
import { Sequelize } from 'sequelize';

export default class UserExperienceService {
  public static async save(model: UserExperienceModel): Promise<void> {
    await UserExperienceModel.create({
      userId: model.userId,
      experience: model.experience,
      type: model.type,
    });
  }

  public static async getExperienceCountByType(
    userId: string
  ): Promise<IUserExperience> {
    const results = await UserExperienceModel.findAll({
      attributes: [
        'type',
        [Sequelize.fn('SUM', Sequelize.col('experience')), 'experience'],
      ],
      where: { userId: userId },
      group: ['type'],
    });
    const experienceCounts: Partial<IUserExperience> = {};
    Object.values(TestTypeEnum).forEach((type: TestTypeEnum) => {
      const result = results.find(item => item.getDataValue('type') === type);
      const experience = result ? Number(result.getDataValue('experience')) : 0;
      experienceCounts[type] = experience;
    });
    return experienceCounts as IUserExperience;
  }

  public static async getCountByType(userId: string): Promise<IUserExperience> {
    const results = await UserExperienceModel.findAll({
      attributes: [
        'type',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      where: { userId: userId },
      group: ['type'],
    });
    const counts: Partial<IUserExperience> = {};
    Object.values(TestTypeEnum).forEach((type: TestTypeEnum) => {
      const result = results.find(item => item.getDataValue('type') === type);
      const count = result ? Number(result.getDataValue('count')) : 0;
      counts[type] = count;
    });
    return counts as IUserExperience;
  }
}
