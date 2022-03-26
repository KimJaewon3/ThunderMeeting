const { DataTypes } = require("@sequelize/core");

const room = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: DataTypes.STRING,
  intro: DataTypes.STRING,
}

module.exports = room
