const express = require('express');
const db = require('./userDb.js')
const router = express.Router();

router.post('/', (req, res) => {
     
     
});



router.post('/:id/posts', (req, res) => {

});




// * GET all users
router.get('/', (req, res) => {
     const query = req.query
     db.get(query)
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

};

function validatePost(req, res, next) {

};

module.exports = router;
