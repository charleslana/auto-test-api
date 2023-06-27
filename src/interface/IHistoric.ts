import UserHistoricModel from '../model/userHistoricModel';

export default interface IHistoric {
  results: UserHistoricModel[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}
