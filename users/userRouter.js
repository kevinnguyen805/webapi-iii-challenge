const express = require('express');
const db = require('./userDb.js')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
     
     
});



router.post('/:id/posts', validatePost, (req, res) => {

});




// * GET all users
router.get('/', (req, res) => {
     
     db.get()
     .then(users => {
          res.status(200).json(users)
     })
     .catch(error => {
          res.status(500).json({message: "Users could not be retrieved"})
     })
});

// * GET user by ID
router.get('/:id', (req, res) => {
     const id = req.params.id
    
     db.getById(id)
     .then(users => {
          res.status(200).json(users)
     })
     .catch(error => {
          res.status(500).json({message: "User could not be retrieved"})
     })
});


// * GET posts by userID
router.get('/:id/posts', (req, res) => {
     const id = req.params.id 

     db.getUserPosts(id)
     .then(posts => {
          res.status(200).json(posts)
     })
     .catch(error => {
          res.status(500).json({message: "Posts from user could not be retrieved"})
     })
});


// * DELETE user by ID
router.delete('/:id', (req, res) => {
     const id = req.params.id 

     db.remove(id)
     .then(user => {
          res.status(200).json(user)
     })
     .catch(error => {
          res.status(500).json({message: "User was unsuccessfully deleted"})
     })
});


// * UPDATE user by ID
router.put('/:id', (req, res) => {
     const id = req.params.id
     const updateInfo = req.body

     db.update(id, updateInfo)
     .then(user => {
          res.status(200).json(user)
     })
     .catch(error => {
          res.status(500).json({message: "User was unsuccessfully updated"})
     })
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {
     const newUser = req.body

     if (newUser) {
          if (!newUser.text) {
               res.status(401).json({ message: "missing required name field" })
          } else {
               next();
          }
     } else {
          res.status(400).json({ message: "missing post data" })
     }
};

function validatePost(req, res, next) {
     const newPost = req.body

     if (newPost) {
          if (newPost.text) {
               next();
          } else {
               res.status(400).json({ message: "missing required text field" })
          }
     } else {
          res.status(400).json({ message: "missing post data" })
     }
};

module.exports = router;
