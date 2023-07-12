import UserHistoricModel from '../model/UserHistoricModel';

export default interface IHistoric {
  results: UserHistoricModel[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}
