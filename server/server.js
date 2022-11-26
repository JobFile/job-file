const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000
const userRouter = require('./routes/route.js')


app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../src/index.html'))
})

app.post('/login', (req, res) => {
  res.status(201).send('login reached'/* add cookie here? */)
})

app.use('/users', userRouter)

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

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = app