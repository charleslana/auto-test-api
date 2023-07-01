import UserExperienceModel from '../model/userExperienceModel';

export default class UserExperienceService {
  public static async save(model: UserExperienceModel): Promise<void> {
    await UserExperienceModel.create({
      userId: model.userId,
      experience: model.experience,
      type: model.type,
    });
  }
}
