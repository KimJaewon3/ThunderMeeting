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
  datetime: DataTypes.STRING,
  confirm: {
    type: DataTypes.STRING,
    defaultValue: 'N',
  }
}

module.exports = room;
