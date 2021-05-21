'use strict';

import { Sequelize, Model, DataTypes } from 'sequelize';

const TABLE_NAME = 'Users';

class User extends Model {

  public id!: BigInt;
  public name!: string;
  public email!: string;
  public password!: string;
  public rememberToken!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static attach(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        },
        rememberToken: {
          type: DataTypes.STRING
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
      },
      {
        tableName: TABLE_NAME,
        sequelize: sequelize,
        freezeTableName: true,
      }
    );
  }

  public static associate(): void {
  }
};

const factory = (sequelize: Sequelize) => {
  User.attach(sequelize);

  return User;
};
  
export { User as User, factory };