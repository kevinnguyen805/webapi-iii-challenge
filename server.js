const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')

// const postRouter = require('/posts/postRouter.js')
// const userRouter = require('/users/userRouter.js')

const server = express();


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(` ${req.method} to ${req.url} on [${new Date().toISOString()}]`);
  next();
};


// TODO 
function validateUserId(req,res,next){
  const id = req.params.id

  if (user_id === id){
    req.user = id
    next();
  } else{
    res.status(400).json({message: "invalid user id"})
  }
}


function validateUser(req,res,next){
  const newUser = req.body

  if(newUser){
    if(!newUser.text){
      res.status(401).json({message: "missing required name field"})
    } else {
      next();
    }
  } else {
    res.status(400).json({message: "missing post data"})
  }
}

function validatePost(req, res, next){
  const newPost = req.body

  if(newPost){
    if(newPost.text){
      next();
    } else {
      res.status(400).json({message: "missing required text field"})
    }
  } else {
    res.status(400).json({message: "missing post data"})
  }
}






// * Global Middleware
server.use(helmet());
server.use(express.json());
server.use(morgan('dev'))
server.use(logger)

// server.use('', postRouter);
// server.use('/api/user', userRouter);

module.exports = server;














/*
TODO: NOTES
* MVP 
  * Write 4 custom middleware functions
    * logger() - logs console => request method + request url + timestamp => GLOBAL
    * validateUserId() - validates id on endpoint => valid = stores user object as req.user 
    * validateUser() - validates body on POST (new user) => 2 errors
    * validatePost() - validates body on POST (new post) => 2 errors 
  * Build an API for CRUD operations
  * Add endpoints to retrieve list of `posts` for a `user` and to store a new `post` for a user`


  TODO: Database functions - 2 files => users/userDb.js + posts/postDb.js
  * userDb has extra method => getUserPosts() - when passed id - returns all post of the user
  - get() 
  - getById()
  - insert()
  - update() 
  - remove() 

  * users => id + name 
  * posts => id + text + user_id (NESTED ROUTE!!!!!!)



*/