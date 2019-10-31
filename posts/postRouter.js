const express = require('express');
const postDB = require('./postDb.js')
const router = express.Router();

// TODO DONE
router.get('/', (req, res) => {
     postDB.get()
     .then(posts => {
          res.status(200).json(posts)
     })
     .catch(error => {
          res.status(500).json({error: "Posts were unsuccessfully retrieved"})
     })
});

// TODO DONE
router.get('/:id', validatePostId, (req, res) => {
     postDB.getById(req.params.id)
     .then(post => {
          res.status(200).json(post)
          // if(post.length > 0){
          //      res.status(200).json(post)
          // } else {
          //      res.status(404).json({message: "The post with specified ID does not exist"})
          // }
     })
     .catch(error => {
          res.status(500).json({error: "Posts from user were unsuccessfully retrieved"})
     })
});


// TODO DONE
router.delete('/:id', validatePostId, (req, res) => {
     postDB.remove(req.params.id)
     .then(post => {
          res.status(200).json(post)
          // if (post > 0){
          //      res.status(200).json(post)
          // } else {
          //      res.status(404).json({message: "The post with specified ID does not exist"})
          // }
     })
     .catch(error => {
          res.status(500).json({error: "Post failed to delete"})
     })
});


// TODO DONE
router.put('/:id', validatePostId, (req, res) => {
     postDB.update(req.params.id, req.body)
     .then(post => {
          if(post > 0){
               postDB.getById(req.params.id)
               .then(updatedPost => res.status(200).json(updatedPost))
          } else{
               res.status(404).json({ message: "The post with the specified ID does not exist."})
          }
     })
     .catch(error => {
          res.status(500).json({error: "Post failed to update"})
     })
});

// custom middleware

function validatePostId(req, res, next) {
     const id = req.params.id 

     postDB.getById(id)
     .then(post => {
          if(post){
               next();
          } else{
               res.status(404).json({message: "Post ID was not valid"})
          }
     })
     .catch(error => {
          res.status(500).json({message: "Post ID does not exist"})
     })
     
};

module.exports = router;