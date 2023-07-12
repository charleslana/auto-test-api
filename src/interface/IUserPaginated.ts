import UserRankEnum from '../enum/UserRankEnum';

export default interface IUserPaginated {
  page: number;
  pageSize: number;
  filterType?: UserRankEnum;
  id: string;
}
