import { Sequelize, Op } from 'sequelize';
import type = require('../@types/DB');

export default class ModelGenerater {
  public sequelize: Sequelize;

  public constructor(dbConfig: any) {
    this.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      port: 3306,
      logging: true,
      omitNull: true,
    });
  }
}

export const Generate = (dbConfig: any) => {
  const modelGenerator = new ModelGenerater(dbConfig);

  return (setModel: any) => {
    const db: type.DB = setModel(modelGenerator.sequelize);

    return {
      ...db,
      Sequelize,
      sequelize: modelGenerator.sequelize,
      Op,
    };
  };
};