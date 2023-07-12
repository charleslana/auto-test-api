import database from '../database';
import ItemModel from './ItemModel';
import UserModel from './UserModel';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class UserItemModel extends Model {
  public id!: string;
  public expirationDate!: Date | null;
  public userId!: string;
  public itemId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserItemModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      field: 'expiration_date',
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
    tableName: 'tb_user_item',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);

UserItemModel.belongsTo(ItemModel, {
  as: 'item',
  foreignKey: 'itemId',
});
