import TestTypeEnum from '../enum/testTypeEnum';
import UserModel from './userModel';
import { database } from './database';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class UserHistoricModel extends Model {
  public id!: string;
  public input!: string;
  public output!: string | undefined;
  public type!: TestTypeEnum;
  public userId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
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
    output: {
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at',
    },
  },
  {
    sequelize: database,
    tableName: 'tb_user_historic',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);
