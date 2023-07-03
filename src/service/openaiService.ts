import HandlerError from '../handler/handlerError';
import IOpenai from '../interface/IOpenai';
import ISendOpenai from '../interface/ISendOpenai';
import TestTypeEnum from '../enum/testTypeEnum';
import UserConquestService from './userConquestService';
import UserExperienceModel from '../model/userExperienceModel';
import UserExperienceService from './userExperienceService';
import UserHistoricModel from '../model/userHistoricModel';
import UserHistoricService from './userHistoricService';
import UserService from './userService';
import { OpenAIApi } from 'openai';
import { randomNumber } from '../utils/utils';
import {
  apiTest,
  bugReport,
  configuration,
  gherkinLanguage,
  performanceTest,
  qualityIndicator,
  securityTest,
  sqlQueryBuilder,
  stepGenerator,
  testGenerator,
  testMassGenerator,
  testPlan,
  testTranslator,
  usabilityTestCase,
} from '../utils/openai';

const openai = new OpenAIApi(configuration);

export default class OpenaiService {
  public static async send(i: ISendOpenai, userId: string): Promise<IOpenai> {
    try {
      const input = `Contexto:\n${i.context ?? ''}\n\nEntrada: ${
        i.input
      }\nSaída:${i.output ?? ''}`;
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'você é um analista de teste que trabalha para uma empresa de software',
          },
          {
            role: 'user',
            content: `${this.getContent(i.type)}${input}`,
          },
        ],
      });
      await this.saveHistoric(
        userId,
        input,
        response.data.choices[0].message?.content,
        i
      );
      const experience = await this.saveUserBounty(userId);
      await this.saveExperience(userId, experience, i.type);
      await UserConquestService.addNewConquests(userId);
      return {
        error: false,
        message: response.data.choices[0].message?.content,
      };
    } catch (error) {
      throw new HandlerError(
        'Ocorreu um erro com o openai. Tente novamente',
        503
      );
    }
  }

  private static async saveUserBounty(userId: string): Promise<number> {
    const experience = randomNumber(5, 10);
    await UserService.updateBounty(userId, experience, randomNumber(50, 100));
    return experience;
  }

  private static async saveHistoric(
    userId: string,
    input: string,
    output: string | undefined,
    i: ISendOpenai
  ): Promise<void> {
    const model = <UserHistoricModel>{};
    model.userId = userId;
    model.input = input;
    model.output = output;
    model.type = i.type;
    await UserHistoricService.save(model);
  }

  private static async saveExperience(
    userId: string,
    experience: number,
    type: TestTypeEnum
  ): Promise<void> {
    const model = <UserExperienceModel>{};
    model.userId = userId;
    model.experience = experience;
    model.type = type;
    await UserExperienceService.save(model);
  }

  private static getContent(type: TestTypeEnum): string {
    switch (type) {
      case TestTypeEnum.TestGenerator:
        return testGenerator;
      case TestTypeEnum.StepGenerator:
        return stepGenerator;
      case TestTypeEnum.BugReport:
        return bugReport;
      case TestTypeEnum.TestPlan:
        return testPlan;
      case TestTypeEnum.QualityIndicator:
        return qualityIndicator;
      case TestTypeEnum.TestTranslator:
        return testTranslator;
      case TestTypeEnum.UsabilityTestCase:
        return usabilityTestCase;
      case TestTypeEnum.TestMassGenerator:
        return testMassGenerator;
      case TestTypeEnum.GherkinLanguage:
        return gherkinLanguage;
      case TestTypeEnum.SecurityTest:
        return securityTest;
      case TestTypeEnum.PerformanceTest:
        return performanceTest;
      case TestTypeEnum.APITest:
        return apiTest;
      case TestTypeEnum.SQLQueryBuilder:
        return sqlQueryBuilder;
      default:
        return testGenerator;
    }
  }
}
