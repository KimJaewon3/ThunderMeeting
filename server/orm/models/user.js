const { DataTypes } = require("@sequelize/core");

const user = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  nick: DataTypes.STRING,
  mbti: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  phone: DataTypes.STRING,
  like: DataTypes.INTEGER,
  sex: DataTypes.STRING,
  sangme: {
    type: DataTypes.STRING,
    defaultValue: "",
  }
}

module.exports = user;
