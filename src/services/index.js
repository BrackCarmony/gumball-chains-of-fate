const gumball = require('./gumball/gumball.service.js');
const chain = require('./chain/chain.service.js');
const guild = require('./guild/guild.service.js');
const users = require('./users/users.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(gumball);
  app.configure(chain);
  app.configure(guild);
  app.configure(users);
};
