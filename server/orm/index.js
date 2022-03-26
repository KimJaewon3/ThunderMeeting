const { Sequelize } = require("@sequelize/core");
const config = require("./config");
const chats = require("./models/chats");
const members = require("./models/members");
const room = require("./models/room");
const user = require("./models/user");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const User = sequelize.define('user', user, {freezeTableName: true});
const Room = sequelize.define('room', room, {freezeTableName: true});
const Members = sequelize.define('members', members, {freezeTableName: true});
const Chats = sequelize.define('chats', chats, {freezeTableName: true});

User.belongsToMany(Room, {through: Members});
Room.belongsToMany(User, {through: Members});

User.belongsToMany(Room, {through: Chats});
Room.belongsToMany(User, {through: Chats});

module.exports = sequelize
