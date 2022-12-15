const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://LuCode:Codingwithlu1492@cluster0.fmcqgyh.mongodb.net/node-angular?retryWrites=true&w=majority";

const Post = require("./models/post");

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post has been added! Great Work!",
      postId: createdPost.id
    });
  });
});

app.get(`/api/posts`, (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: `Post fetched successfully!`,
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!" });
  });
});

module.exports = app;