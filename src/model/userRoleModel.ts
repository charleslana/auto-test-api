import UserModel from './userModel';
import UserRoleEnum from '../enum/userRoleEnum';
import { database } from './database';
import { DataTypes, Model } from 'sequelize';

export default class UserRoleModel extends Model {
  public id!: string;
  public name!: UserRoleEnum;
  public userId!: string;
}

UserRoleModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM(...Object.values(UserRoleEnum)),
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserModel,
        key: 'id',
      },
      field: 'user_id',
    },
  },
  {
    sequelize: database,
    tableName: 'tb_user_role',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
