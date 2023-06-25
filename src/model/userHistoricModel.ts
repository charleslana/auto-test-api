import UserModel from './userModel';
import { database } from './database';
import { DataTypes, Model } from 'sequelize';

export default class UserHistoricModel extends Model {
  public id!: string;
  public content!: string | undefined;
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
    content: {
      type: DataTypes.TEXT,
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
