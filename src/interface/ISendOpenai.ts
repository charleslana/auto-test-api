import TestTypeEnum from '../enum/testTypeEnum';

export default interface ISendOpenai {
  input: string;
  context?: string;
  type: TestTypeEnum;
  output?: string;
}
