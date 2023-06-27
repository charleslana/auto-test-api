import HandlerError from '../handler/handlerError';
import IOpenai from '../interface/IOpenai';
import ISendOpenai from '../interface/ISendOpenai';
import UserHistoricModel from '../model/userHistoricModel';
import UserHistoricService from './userHistoricService';
import UserService from './userService';
import { configuration } from '../utils/openai';
import { OpenAIApi } from 'openai';
import { randomNumber } from '../utils/utils';

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
            content: `crie até 3 casos de testes com passo a passo e resultado esperado para o requisito\nuse a técnica de valores limitrofes ou outras técnicas que julgar necessário para validar o sistema. Por favor, forneça-nos um trecho da documentação do software ou um requisito específico que deseja validar.\n\nContexto:\n${
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
}
