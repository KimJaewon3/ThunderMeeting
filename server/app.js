require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const accountRouter = require("./src/router/account")

app.use("/account", accountRouter);

app.get("/", (req, res) => {
  res.status(201).send("hello");
});

module.exports = app;