import HandlerError from '../handler/handlerError';
import IOpenai from '../interface/IOpenai';
import { configuration } from '../utils/openai';
import { OpenAIApi } from 'openai';

const openai = new OpenAIApi(configuration);

export default class OpenaiService {
  public static async send(content: string): Promise<IOpenai> {
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo-0301',
        messages: [
          {
            role: 'user',
            content:
              'crie até 3 casos de testes com passo a passo e resultado esperado para o requisito\nuse a tecnica de valores limitrofes. Por favor, forneça-nos um trecho da documentação do software ou um requisito específico que deseja validar.\n\nContexto:\nEx.: Sistema de cartão de credito de um banco\n\nEntrada: Ex.: o cartão de credito deve ser bloqueado 5 dias após o vencimento da fatura se o cliente não pagar\nSaída:',
          },
        ],
        max_tokens: 500,
        n: 1,
        temperature: 0.2,
      });
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
