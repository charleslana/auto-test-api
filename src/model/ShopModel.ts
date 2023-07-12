import database from '../database';
import ItemModel from './ItemModel';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class ShopModel extends Model {
  public id!: string;
  public score!: number;
  public itemId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ShopModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: ItemModel,
        key: 'id',
      },
      field: 'item_id',
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
    tableName: 'tb_shop',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);

ShopModel.belongsTo(ItemModel, {
  as: 'item',
  foreignKey: 'itemId',
});
