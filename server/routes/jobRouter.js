const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

// TODO: review isLoggedIn middleware

router.post('/', jobController.createJob, (req, res) => {
  res.status(200).json(res.locals.createdJob);
});

router.delete('/:id', jobController.deleteJob, (req, res) => {
  res.status(200).json(res.locals.deletedJob);
});

router.patch('/:id', jobController.updateJobApp, (req, res) => {
  console.log('FINAL RESPONSE IS: ', res.locals.updatedJobApp);
  res.status(200).json(res.locals.updatedJobApp);
});

module.exports = router;
