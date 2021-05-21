const Log4js = require('log4js');
const config = require('./log4js-config');

Log4js.configure(config);
const console = Log4js.getLogger();
const access = Log4js.getLogger("access"); 
const system = Log4js.getLogger("system"); 

// ログ種別のエクスポート
module.exports = {
  console,
  access,
  system,
};