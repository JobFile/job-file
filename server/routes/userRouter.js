const express = require('express');
// TODO: IMPORT CONTROLLERS
const userController = require('../controllers/userController');
const jobController = require('../controllers/jobController');
const router = express.Router();

router.post('/', userController.createUser, (req, res) => {
  res.status(200).send(res.locals.createdUser);
});

router.get('/:id', jobController.getJobsList, (req, res) => {
  res.status(200).json(res.locals.jobs);
});

module.exports = router;
