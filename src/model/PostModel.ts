import database from '../database';
import UserModel from './UserModel';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class PostModel extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public enable!: boolean;
  public userId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

PostModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'tb_post',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);

PostModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: 'userId',
});
