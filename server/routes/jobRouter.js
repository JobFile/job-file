const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

// TODO: review isLoggedIn middleware

router.post('/', jobController.createJob, (req,res) => {
  res.status(200).json(res.locals.createdJob);
})

router.delete('/:id', jobController.deleteJob, (req,res) => {
  res.status(200).json(res.locals.deletedJob);
})

router.patch('/:id', jobController.updateJob, (req,res) => {
  res.status(200).json(res.locals.updatedJob);
})

module.exports = router;