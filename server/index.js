require("dotenv").config();
const { sequelize } = require("./orm/index.js") 
const app = require("./app.js");

const PORT = process.env.PORT;

// db connection test
async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function dbSync() {
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
}

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
  //testDBConnection();
});