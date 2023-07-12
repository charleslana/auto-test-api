import ConquestModel from './ConquestModel';
import database from '../database';
import UserModel from './UserModel';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class UserConquestModel extends Model {
  public id!: string;
  public userId!: string;
  public conquestId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserConquestModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
    conquestId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: ConquestModel,
        key: 'id',
      },
      field: 'conquest_id',
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
    tableName: 'tb_user_conquest',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);

UserConquestModel.belongsTo(ConquestModel, {
  as: 'conquest',
  foreignKey: 'conquestId',
});
