require("dotenv").config();
const { sequelize } = require("./orm/index.js") 
const app = require("./app.js");
const { webSocket } = require("./socket/index.js");
const http = require('http');

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

const server = http.createServer(app);

webSocket(server);

server.listen(PORT, () => {
  // 마이그레션 필요시 주석 해제
  // dbSync();
  console.log(`Server Listening on ${PORT}`);
  // testDBConnection();
});