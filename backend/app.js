const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const Post = require("./models/post");

// app.use((req,res,next)=>{
//   res.send("Hello from express again");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Accept, Content-Type"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// app.post('/api/posts',(req,res,next)=>{
//     const post = req.body;
//     res.status(201).json({
//       message : "Post added successfully"
//     });
// });

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save().then((createdPost)=>{
    res.status(201).json({
      message: "Post added successfully",
      postId : createdPost._id
    });
  });

});

// app.use("/api/posts", (req, res, next) => {
//   const posts = [
//     {
//       id: "gdfst4567",
//       title: "First title",
//       content: "First content coming from node Server"
//     },
//     {
//       id: "gdhtr5645",
//       title: "Second title",
//       content: "Second content coming from node Server"
//     }
//   ];
//   res.status(200).json({
//     message: "Posts fetched successfully",
//     posts: posts
//   });
// });

app.get('/api/posts',(req,res)=>{
  Post.find().then((docs)=>{
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: docs
    });
  });
});

app.delete('/api/posts/:id',(req,res)=>{
  //console.log(req.params.id);
  Post.deleteOne({
    _id : req.params.id
  })
  .then((result)=>{
    console.log(result);
    res.status(200).json({
      message : "Post deleted successfully"
    })
  })
})

module.exports = app;
