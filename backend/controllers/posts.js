const Post = require("../models/post")

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;

  if(req.query.date == 'true') {
    if(req.query.author=='undefined' || req.query.author == undefined) { req.query.author = ""}
    if(req.query.title=='undefined' || req.query.title == undefined) { req.query.title = ""}
    if(req.query.university=='undefined' || req.query.university == undefined) { req.query.university = ""}
    if(req.query.course=='undefined' || req.query.course == undefined) { req.query.course = ""}

    const postQuery = Post.find({
          "author" : { $regex: req.query.author, $options: 'i'},
          "title" : { $regex: req.query.title, $options: 'i'},
          "university" : { $regex: req.query.university, $options: 'i'},
          "course" : { $regex: req.query.course, $options: 'i'},
          "date": { $gte: new Date(Date.now()) }
    });
    const counter = Post.find({
      "author": { $regex: req.query.author, $options: 'i'},
      "title" : { $regex: req.query.title, $options: 'i'},
      "university" : { $regex: req.query.university, $options: 'i'},
      "course" : { $regex: req.query.course, $options: 'i'},
      "date": { $gte: new Date(Date.now()) }
    }).countDocuments();

    let fetchedPosts;
    if (pageSize && currentPage) {
      postQuery
      .skip(pageSize * (currentPage-1))
      .limit(pageSize);
    }
    postQuery
    .then( documents => {
      fetchedPosts = documents;
      return counter;
    }).then( count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
  } else {
    if(req.query.author=='undefined' || req.query.author == undefined) { req.query.author = ""}
    if(req.query.title=='undefined' || req.query.title == undefined) { req.query.title = ""}
    if(req.query.university=='undefined' || req.query.university == undefined) { req.query.university = ""}
    if(req.query.course=='undefined' || req.query.course == undefined) { req.query.course = ""}

    const postQuery = Post.find({
          "author" : { $regex: req.query.author, $options: 'i'},
          "title" : { $regex: req.query.title, $options: 'i'},
          "university" : { $regex: req.query.university, $options: 'i'},
          "course" : { $regex: req.query.course, $options: 'i'}
    });
    const counter = Post.find({
      "author": { $regex: req.query.author, $options: 'i'},
      "title" : { $regex: req.query.title, $options: 'i'},
      "university" : { $regex: req.query.university, $options: 'i'},
      "course" : { $regex: req.query.course, $options: 'i'},
    }).countDocuments();

    let fetchedPosts;
    postQuery
    .then( documents => {
      fetchedPosts = documents;
      return counter;
    }).then( count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
  }


}

exports.createPost =  (req, res, next) => {
  console.log(req.body);
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
    course: req.body.course,
    university: req.body.university,
    author: req.body.author,
    messages: req.body.messages,
    startingPrice: req.body.startingPrice,
    minimumAllowedPrice: req.body.minimumAllowedPrice,
    winner: null,
    date: req.body.date,
    bought: req.body.bought
  });
  post.save().then(createdPost => {
    res.status(201).json({
    message: 'Post added successfully',
    post: {
      id: createdPost._id,
      title: createdPost.title,
      content: createdPost.content,
      imagePath: createdPost.imagePath,
      course: createdPost.course,
      university: createdPost.university,
      author: createdPost.author,
      messages: createdPost.messages,
      startingPrice: createdPost.startingPrice,
      minimumAllowedPrice: createdPost.minimumAllowedPrice,
      winner: createdPost.winner,
      date: createdPost.date,
      bought: createdPost.bought
    }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a post failed!"
    })
  });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    course: req.body.course,
    university: req.body.university,
    author: req.body.author,
    messages: req.body.messages,
    startingPrice: req.body.startingPrice,
    minimumAllowedPrice: req.body.minimumAllowedPrice,
    winner: req.body.winner,
    date: req.body.date,
    bought: req.body.bought
  })

  Post.updateOne({_id: req.params.id},post).then( result => {
      if(result.n > 0) {
        res.status(200).json({message: 'Update successful!'});
      } else {
        res.status(401).json({message:"Wrong"});
      }

  });
  };

  exports.deletePost = (req, res, next) => {
    Post.deleteOne({_id: req.params.id, isAdmin: req.userData.isAdmin}).then( result => {
      if(result.n > 0) {
        res.status(200).json({message: 'Deletion successful!'});
      } else {
        res.status(401).json({message: 'Not authorized!'});
      }
    });
  };

  exports.getPost =  (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'Post not found!'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
  });
  }
