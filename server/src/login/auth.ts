import bcrypt = require('bcryptjs');
import passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const User = require('../db/models').User;
import db from'../db/models/index';
import { User } from '../db/models/users';

const saltRounds = 10;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email : string, password : string, done : any) =>  {

    db.users.findOne({
      where: {
        'email': email
      }
    })
    .then((user : User | null) => {

      if(user && bcrypt.compareSync(password, user.password)) {

        return done(null, user);  // ログイン成功

      }

      return done(null, false, { message: '認証情報と一致するレコードがありません。' });

    })
    .catch((error : any) => { // エラー処理

      return done(null, false, { message: '認証情報と一致するレコードがありません。' });

    });

}));

// passportとセッションの紐づけ
// ユーザーデータからユニークユーザー識別子を取り出す
passport.serializeUser((user  : Express.User, done : any) => {

  done(null, user);

});

// ユニークユーザー識別子からユーザーデータを取り出す
passport.deserializeUser((user : Express.User, done : any) => {

  done(null, user);

});

const SaveRememberToken = (id : string) : string =>{
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(id.toString(), salt)
  
  const rememberToken = salt  +'|'+ hash

  db.users.update(
    { 'rememberToken' : salt },
    { where: { 'id': id } }
  ).catch()
  {
      // todo log
  }

  return rememberToken;
}


const IsAuthenticatedRememberToken = async (rememberToken : string, hash : string) :Promise<boolean> =>{
  const users = await db.users.findAll({
      where: {
        rememberToken: rememberToken
      }
    });

    for(const user of users)
    {
      if(bcrypt.compareSync(user.id.toString(), hash))
      {
        // todoトークン更新
        return true;
      }
    }
    return false;
}

export { passport, SaveRememberToken, IsAuthenticatedRememberToken };