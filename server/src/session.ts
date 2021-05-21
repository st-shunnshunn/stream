const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const env = process.env.NODE_ENV || 'development';
const config = require('./db/config/config.json')[env];

const sessionStore = new MySQLStore(config);

const Session = session({
    // 必須項目（署名を行うために使います）
    secret: 'YOUR-SECRET-STRING',
 
    // 推奨項目（セッション内容に変更がない場合にも保存する場合にはtrue）
    resave : false,               
    
    // 推奨項目（新規にセッションを生成して何も代入されていなくても値を入れる場合にはtrue）
    saveUninitialized : true,                
 
    // セッションの保存先
    store: sessionStore,
 
    /*
    // アクセスの度に、有効期限を伸ばす場合にはtrue
    rolling : true,
 
    // クッキー名（デフォルトでは「connect.sid」）
    name : 'my-special-site-cookie',
 
    // 一般的なCookie指定
    // デフォルトは「{ path: '/', httpOnly: true, secure: false, maxAge: null }」
    cookie            : {
        // 生存期間（単位：ミリ秒）
        maxAge : 1000 * 60 * 60 * 24 * 30, // 30日
    }
    */
 });

export {Session, sessionStore};