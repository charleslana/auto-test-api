import TestTypeEnum from '../enum/TestTypeEnum';

export default interface IHistoricPaginated {
  page: number;
  pageSize: number;
  filterType?: TestTypeEnum;
  userId: string;
}
