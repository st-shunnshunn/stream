'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

import Sequelize from'sequelize';
import {Generate}  from'../util/model_generator';
import schema  from'./schema';
import types  from'../@types/DB';

const setModel = (sequelize: Sequelize.Sequelize): types.DB => {
  const db: any = {};

  Object.keys(schema).forEach(tableName => {
    // ブラケットアクセスの場合は、明示的に型を定義しないとコンパイル時に怒られる
    type KeyType =  keyof types.DB;
    const key : KeyType = tableName as KeyType;
    db[key] = schema[key].factory(sequelize);
  });

  // associationを貼るのは各Modelのinit()が全て終わってから
  // (全モデルのinit()が終わる前にassociationを貼るとそんなモデル知らないみたいなエラーで死ぬ）
  Object.keys(schema).forEach(tableName => {
    type KeyType =  keyof types.DB;
    const key : KeyType = tableName as KeyType;
    if ('associate' in db[key]) {
      db[key].associate(db);
    }
  });

  return db;
};

const modelGenerator = Generate(config);
const db = modelGenerator(setModel);

export default db;
