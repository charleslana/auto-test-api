import database from '../database';
import PostModel from './PostModel';
import UserModel from './UserModel';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class CommentModel extends Model {
  public id!: string;
  public message!: string;
  public postId!: string;
  public userId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

CommentModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    postId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: PostModel,
        key: 'id',
      },
      field: 'post_id',
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
    tableName: 'tb_comment',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);

CommentModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: 'userId',
});
