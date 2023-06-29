import UserRankEnum from '../enum/userRankEnum';

export default interface IUserPaginated {
  page: number;
  pageSize: number;
  filterType?: UserRankEnum;
  id: string;
}
