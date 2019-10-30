const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')

const postRouter = require('./posts/postRouter.js')
const userRouter = require('./users/userRouter.js')


const server = express();



//custom middleware
// TODO DONE
function logger(req, res, next) {
  console.log(` ${req.method} to ${req.url} on [${new Date().toISOString()}]`);
  next();
};




// * Global Middleware
server.use(helmet());
server.use(express.json());
server.use(morgan('dev'))
server.use(logger)

server.use('/api/users/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

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