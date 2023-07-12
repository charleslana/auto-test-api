import UserModel from '../model/UserModel';

export default interface IRankAndUserList {
  results: UserModel[];
  rank: string;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}
