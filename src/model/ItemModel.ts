import database from '../database';
import TestTypeEnum from '../enum/TestTypeEnum';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class ItemModel extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public expiryDay!: number | null;
  public type!: TestTypeEnum;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ItemModel.init(
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
    expiryDay: {
      type: DataTypes.INTEGER,
      field: 'expiry_day',
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
    tableName: 'tb_item',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);
