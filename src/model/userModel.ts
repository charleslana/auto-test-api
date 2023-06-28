import UserRoleModel from './userRoleModel';
import { database } from './database';
import {
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  Sequelize,
} from 'sequelize';

export default class UserModel extends Model {
  public id!: string;
  public authToken!: string | null;
  public email!: string;
  public password!: string;
  public name!: string | null;
  public banned!: Date | null;
  public level!: number;
  public experience!: number;
  public maximumExperience!: number;
  public score!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public readonly roles!: UserRoleModel[];
  public getRoles!: HasManyGetAssociationsMixin<UserRoleModel>;
}

UserModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    authToken: {
      type: DataTypes.STRING,
      field: 'auth_token',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    banned: {
      type: DataTypes.DATE,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    maximumExperience: {
      type: DataTypes.VIRTUAL(DataTypes.INTEGER, ['maximumExperience']),
      get: function () {
        return 50 * this.get('level');
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'tb_user',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);

UserModel.hasMany(UserRoleModel, { as: 'roles', foreignKey: 'userId' });
