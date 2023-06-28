import TestTypeEnum from '../enum/testTypeEnum';

export default interface IHistoricPaginated {
  page: number;
  pageSize: number;
  filterType?: TestTypeEnum;
  userId: string;
}
