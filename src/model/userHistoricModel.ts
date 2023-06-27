import TestTypeEnum from '../enum/testTypeEnum';
import UserModel from './userModel';
import { database } from './database';
import { DataTypes, Model } from 'sequelize';

export default class UserHistoricModel extends Model {
  public id!: string;
  public input!: string | undefined;
  public type!: TestTypeEnum;
  public userId!: string;
}

UserHistoricModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    input: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TestTypeEnum)),
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
    tableName: 'tb_user_historic',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
