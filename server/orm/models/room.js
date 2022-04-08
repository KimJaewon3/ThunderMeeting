const { DataTypes } = require("@sequelize/core");

const room = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: DataTypes.STRING,
  intro: DataTypes.STRING,
  lat: DataTypes.STRING,
  long: DataTypes.STRING,
  address: DataTypes.STRING,
}

module.exports = room;
