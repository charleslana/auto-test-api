import HandlerError from '../handler/handlerError';
import IOpenai from '../interface/IOpenai';
import ISendOpenai from '../interface/ISendOpenai';
import TestTypeEnum from '../enum/testTypeEnum';
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
            content: `${this.getContent(i.type)}Contexto:\n${
              i.context ?? ''
            }\n\nEntrada: ${i.input}\nSaída:${i.output ?? ''}`,
          },
        ],
      });
      const model = <UserHistoricModel>{};
      model.userId = userId;
      model.input = response.data.choices[0].message?.content;
      model.type = i.type;
      try {
        await UserHistoricService.save(model);
      } catch (error) {
        throw new HandlerError('Ocorreu um ao salvar o histórico', 503);
      }
      try {
        await UserService.updateBounty(
          userId,
          randomNumber(5, 10),
          randomNumber(50, 100)
        );
      } catch (error) {
        throw new HandlerError(
          'Ocorreu um ao salvar a experiência do usuário',
          503
        );
      }
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
