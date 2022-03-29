const { DataTypes } = require("@sequelize/core");

const chats = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: DataTypes.STRING,
  createdAt: DataTypes.STRING,
}

module.exports = chats
