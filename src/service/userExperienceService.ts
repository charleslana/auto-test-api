import IUserExperience from '../interface/IUserExperience';
import TestTypeEnum from '../enum/testTypeEnum';
import UserExperienceModel from '../model/userExperienceModel';
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
      (experienceCounts as any)[type] = experience;
    });
    return experienceCounts as IUserExperience;
  }
}
