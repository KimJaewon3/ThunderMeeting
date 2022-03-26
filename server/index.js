require("dotenv").config();
const sequelize = require("./orm/index.js") 
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
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
}

app.listen(4000, () => {
  console.log(`Server Listening on ${PORT}`);
  testDBConnection();
});