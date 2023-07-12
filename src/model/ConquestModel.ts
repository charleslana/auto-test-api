import database from '../database';
import TestTypeEnum from '../enum/TestTypeEnum';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class ConquestModel extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public experience!: number;
  public type!: TestTypeEnum;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ConquestModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TestTypeEnum)),
      allowNull: false,
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
    tableName: 'tb_conquest',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);
