import HandlerError from '../handler/handlerError';
import IOpenai from '../interface/IOpenai';
import UserHistoricModel from '../model/userHistoricModel';
import UserHistoricService from './userHistoricService';
import UserService from './userService';
import { configuration } from '../utils/openai';
import { OpenAIApi } from 'openai';
import { randomNumber } from '../utils/utils';

const openai = new OpenAIApi(configuration);

export default class OpenaiService {
  public static async send(content: string, userId: string): Promise<IOpenai> {
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'você é um analista de testes que trabalha para uma empresa de softwares',
          },
          {
            role: 'user',
            content:
              'crie até 3 casos de testes com passo a passo e resultado esperado para o requisito\nuse a tecnica de valores limitrofes ou outras tecnicas que julgar necessario para validar o sistema. Por favor, forneça-nos um trecho da documentação do software ou um requisito específico que deseja validar.\n\nContexto:\nEx.: Sistema de cartão de credito de um banco\n\nEntrada: Ex.: o cartão de credito deve ser bloqueado 5 dias após o vencimento da fatura se o cliente não pagar\nSaída:',
          },
          // {
          //   role: 'user',
          //   content:
          //     'crie até 3 casos de testes com passo a passo e resultado esperado para o requisito\nuse a tecnica de valores limitrofes ou outras tecnicas que julgar necessario para validar o sistema. Por favor, forneça-nos um trecho da documentação do software ou um requisito específico que deseja validar.\n\nEntrada: Ex.: o cartão de credito deve ser bloqueado 5 dias após o vencimento da fatura se o cliente não pagar\nSaída:',
          // },
        ],
      });
      const model = <UserHistoricModel>{};
      model.userId = userId;
      model.content = response.data.choices[0].message?.content;
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
}
