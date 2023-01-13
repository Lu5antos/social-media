const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");

const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://LuCode:Codingwithlu1492@cluster0.fmcqgyh.mongodb.net/node-angular?retryWrites=true&w=majority";

const app = express();
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Successfully connected to db!");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
