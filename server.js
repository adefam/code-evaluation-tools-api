const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });
const userRoute = require('./server/routes/user');
const color = require('./server/util/color');
const Sentry = require('./server/middleware/sentry');

const app = express();

app.use(express.json());

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

Sentry.captureMessage('Error Message', 'warnning');

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', userRoute);

app.use('/', (req, res) => {
  res.send('Welcome to code evaluation api');
});

app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server is running at port ${PORT}`.success));
