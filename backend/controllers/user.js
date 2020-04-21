const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require("../models/user")

exports.createUser =  (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  const user = new User({
    email: req.body.email,
    password: hash,
    admin: req.body.admin,
    isVerified: req.body.isVerified
  });
  user.save()
  .then(result => {
    res.status(201).json({
      message: 'User created!',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
        message: "Invalid authentication credentials!"
    });
  });
})
}

exports.createModerator =  (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  const user = new User({
    email: req.body.email,
    password: hash,
    admin: req.body.admin,
    isVerified: req.body.isVerified
  });
  user.save()
  .then(result => {
    res.status(201).json({
      message: 'User created!',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
        message: "Invalid authentication credentials!"
    });
  });
})
}

exports.modifyPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User ({
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin,
      isVerified: req.body.isVerified,

    })
    User.findOneAndUpdate({_id:req.params.id}, {$set:{password: hash, isVerified: true}}, {new: true}, (err, usr) => {
      if(err) {
        res.status(401).json({message:"Wrong"});
      } else
      res.status(200).json({message: 'Update successful!'});
    });


  });
}
exports.userLogin =  (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    if(!user) { return res.status(404).json({ message: "Auth failed"}); }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then( result => {
    if (!result) {
      return res.status(404).json({ message: "Auth failed"});
    }
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      admin: fetchedUser.admin,
      isVerified: fetchedUser.isVerified
    });
  })
  .catch(err => {
    res.status(404).json({
      message: "Invalid authentication credentials"
    });
  });
}
