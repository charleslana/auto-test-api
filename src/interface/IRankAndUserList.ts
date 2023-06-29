import UserModel from '../model/userModel';

export default interface IRankAndUserList {
  results: UserModel[];
  rank: string;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}
