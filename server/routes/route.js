const express = require('express')
// TODO: IMPORT CONTROLLERS
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send(res.locals.applications)
})

router.post('/', (req, res) => {
  res.status(200).send(res.locals.application)
})

router.post('/', (req, res) => {
  res.status(200).send(res.locals.application)
})

module.exports = router
