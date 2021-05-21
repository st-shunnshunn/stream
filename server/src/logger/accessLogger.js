const logger = require("./logger").access
const log4js = require('log4js');

module.exports = (options) => {
  options = options || {}; 
  options.level = options.level || "auto";
  return log4js.connectLogger(logger, options);
};
