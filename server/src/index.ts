import express = require('express');
const app = express();

import {passport as auth, SaveRememberToken, IsAuthenticatedRememberToken} from './login/auth';
import { Session }  from './session';

const cookies = require("cookie-parser");
const flash = require('connect-flash');
const path = require('path')
const accessLogger = require('./logger/accessLogger')


const port = process.env.PORT || 8080;

// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(flash());
app.use(Session);
app.use(auth.initialize());
app.use(auth.session());
app.use(accessLogger());

const authMiddleware = (req : express.Request, res : express.Response, next : express.NextFunction) => {
  // セッションの確認
  if(req.isAuthenticated()) {

    next();

  } else if(req.cookies?.remember_me) {
    // GUIから自動的にログインを選択した場合に使用する
    const [rememberToken, hash] = req.cookies.remember_me.split('|');
    IsAuthenticatedRememberToken(rememberToken, hash).then(result=>{
      if(result)
      {
        next();
      }
      else
      {
        res.redirect(302, '/login');
      }
    });
  } else {

    res.redirect(302, '/login');

  }
};

// ログインフォーム
app.get('/login', (req: express.Request, res : express.Response ) => {
  const errorMessage ="test";
  res.sendFile(__dirname + '/public' + '/form.html');
});

// ログイン実行
app.post('/login',
  auth.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    failureMessage: '「メールアドレス」と「パスワード」は必須入力です。'
  }),
  (req: express.Request, res : express.Response , next : express.NextFunction) => {
    /*
    if(!req.body.remember) {  // 次回もログインを省略しない場合

      res.clearCookie('remember_me');
      return next();

    }
  */

    if(req.user === undefined)
    {
      return res.redirect('/user');
    }

    // ログイン維持トークンを保持する
    const user : Express.User = req.user;
    const rememberToken = SaveRememberToken(user.id);

    res.cookie('remember_me', rememberToken, {
      path: '/',
      maxAge: 5 * 365 * 24 * 60 * 60 * 1000 // 5年
    });
  
    return next();
  },
  (req: express.Request, res : express.Response) => {
    res.redirect('/user');
  }
);

// ログイン成功後のページ
app.get('/user', authMiddleware, (req : express.Request, res : express.Response ) => {
  const user = req.user;
  res.send('ログイン完了！');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});