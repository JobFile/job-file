const express = require('express');
// TODO: IMPORT CONTROLLERS
const userController = require('../controllers/userController');
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

module.exports = router;
