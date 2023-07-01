import UserModel from './userModel';
import { database } from './database';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class UserExperienceModel extends Model {
  public id!: string;
  public experience!: number;
  public userId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserExperienceModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    experience: {
      type: DataTypes.INTEGER,
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
    tableName: 'tb_user_experience',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);
