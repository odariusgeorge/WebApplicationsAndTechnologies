const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://george:sqsH7Ud4ghXRFCTm@cluster0-lerqw.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to databse');
}).catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "*"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "*"
  );
  next();
});


app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
    message: 'Post added successfully',
    postId: result._id
    });
  });
});

app.get('/api/posts',(req, res, next) => {
  Post.find()
  .then( documents => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then( result => {
    console.log(result);
    res.status(200).json( {message: "Post deleted!"});
  })
});

module.exports = app;
