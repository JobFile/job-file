const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000

const PG_URI = ''

// TODO: connect pg DB

app.use(express.json())

app.use('*', (req, res) => {
  res.sendStatus(404)
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error caught in unknown middleware error',
    status: 400,
    message: { err: 'an error occured' }
  }
  const errorObj = Object.assign(defaultErr, err)
  return JSON.stringify(res.status(errorObj.status).send(errorObj.message))
})

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = app
