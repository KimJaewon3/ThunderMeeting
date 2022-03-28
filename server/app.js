require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const corsOption = {
  Headers: { "content-type": "application/json" },
  origin: true,
  credentials: true,
  method: ["post", "get", "put", "patch", "delete", "options"],
};

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));

const accountRouter = require("./src/router/account");
const roomRouter = require("./src/router/room");
const membersRouter = require("./src/router/members")

app.use("/account", accountRouter);
app.use("/room", roomRouter);
app.use("/members", membersRouter);

app.get("/", (req, res) => {
  res.status(201).send("hello");
});

module.exports = app;