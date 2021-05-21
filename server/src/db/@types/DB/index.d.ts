import schema = require('../../models/schema');

declare interface DB {
  users: typeof schema.default.users.User;
}