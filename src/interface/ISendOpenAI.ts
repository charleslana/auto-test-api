import TestTypeEnum from '../enum/TestTypeEnum';

export default interface ISendOpenAI {
  input: string;
  context?: string;
  type: TestTypeEnum;
  output?: string;
}
