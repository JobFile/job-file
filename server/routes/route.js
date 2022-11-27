const express = require('express');
// TODO: IMPORT CONTROLLERS
const userController = require('../controllers/userController');
const jobController = require('../controllers/jobController');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(res.locals.applications)
});

router.post('/', userController.createUser, (req, res) => {
  console.log('inside user router')
  
  res.status(200).send(res.locals.application)
});

router.post('/', (req, res) => {
  res.status(200).send(res.locals.application)
});

router.get('/:id', jobController.getJobsList, (req, res) => {
  res.status(200).json(res.locals.jobs)
});

router.post('/job', jobController.createJob, (req,res) => {
  res.status(200).json(res.locals.application)
})

router.delete('/job/:id', jobController.deleteJob, (req,res) => {
  console.log('inside deleted router')
  res.status(200).json(res.locals.application)
})

router.patch('/job/:id', jobController.updateJob, (req,res) => {
  console.log('inside update router')
  res.status(200).json(res.locals.application)
})

module.exports = router;
