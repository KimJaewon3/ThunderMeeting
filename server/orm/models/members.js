const { DataTypes } = require("@sequelize/core");

const members = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
}

module.exports = members;
