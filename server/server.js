const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const userRouter = require('./routes/userRouter.js');
const jobRouter = require('./routes/jobRouter.js');
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());

app.use(
  cors({
    origin: 'http://http://localhost:8080/',
    credentials: true,
  })
);

app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/login', sessionController.isLoggedIn, (req, res) => {
  if (res.locals.isSSIDValid) res.status(200).json(res.locals.userID);
  else res.status(501).sendStatus('Invalid SSID');
});

app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log(
      'i am inside login server and res...userId is',
      res.locals.userID
    );
    res.status(201).json({ userID: res.locals.userID });
  }
);

app.use('/users', userRouter);

app.use('/jobs', jobRouter);

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error caught in unknown middleware error',
    status: 400,
    message: { err: 'an error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
