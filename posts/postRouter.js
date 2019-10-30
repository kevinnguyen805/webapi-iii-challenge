const express = require('express');
const postDB = require('./postDb.js')
const router = express.Router();

router.get('/', (req, res) => {
     postDB.get()
     .then(posts => {
          res.status(200).json(posts)
     })
     .catch(error => {
          res.status(500).json({error: "Posts were unsuccessfully retrieved"})
     })
});

router.get('/:id', (req, res) => {
     postDB.getById(req.params.id)
     .then(post => {
          res.status(200).json(post)
     })
     .catch(error => {
          res.status(500).json({error: "Posts from user were unsuccessfully retrieved"})
     })
});


router.delete('/:id', (req, res) => {
     postDB.remove(req.params.id)
     .then(post => {
          res.status(200).json(post)
     })
     .catch(error => {
          res.status(500).json({error: "Post failed to delete"})
     })
});

router.put('/:id', (req, res) => {
     postDB.update(req.params.id, req.body)
     .then(post => {
          res.status(200).json(post)
     })
     .catch(error => {
          res.status(500).json({error: "Post failed to update"})
     })
});

// custom middleware

function validatePostId(req, res, next) {


};

module.exports = router;