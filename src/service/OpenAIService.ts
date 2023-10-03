import HandlerError from '../handler/HandlerError';
import IOpenAI from '../interface/IOpenAI';
import ISendOpenAI from '../interface/ISendOpenAI';
import TestTypeEnum from '../enum/TestTypeEnum';
import UserConquestService from './UserConquestService';
import UserExperienceModel from '../model/UserExperienceModel';
import UserExperienceService from './UserExperienceService';
import UserHistoricModel from '../model/UserHistoricModel';
import UserHistoricService from './UserHistoricService';
import UserItemService from './UserItemService';
import UserService from './UserService';
import { OpenAIApi } from 'openai';
import { randomNumber } from '../utils/utils';
import {
  apiTest,
  automationCode,
  bugReport,
  configuration,
  cucumberCode,
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
  testingStrategy,
  usabilityTestCase,
} from '../utils/openai';

const openAI = new OpenAIApi(configuration);

export default class OpenAIService {
  public static async send(i: ISendOpenAI, userId: string): Promise<IOpenAI> {
    await this.validateUserItemExistsType(userId, i.type);
    try {
      const input = `Contexto:\n${i.context ?? ''}\n\nEntrada: ${
        i.input
      }\nSaída:${i.output ?? ''}`;
      const response = await openAI.createChatCompletion({
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
        'Ocorreu um erro com o openAI. Tente novamente',
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
    i: ISendOpenAI
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
      case TestTypeEnum.CucumberCode:
        return cucumberCode;
      case TestTypeEnum.AutomationCode:
        return automationCode;
      case TestTypeEnum.TestingStrategy:
        return testingStrategy;
      default:
        return testGenerator;
    }
  }

  private static async validateUserItemExistsType(
    userId: string,
    type: TestTypeEnum
  ): Promise<void> {
    const validate = await UserItemService.validateUserItemExistsType(
      userId,
      type
    );
    if (!validate) {
      throw new HandlerError('Você não possui o item da ferramenta', 400);
    }
  }
}
