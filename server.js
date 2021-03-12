const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });
const avatar = require('./server/routes/avatar')
const userRoute = require('./server/routes/user');
const passwordReset = require('./server/routes/passwordReset');
const adminRoute = require('./server/routes/admin');
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

// Routes
app.use('/api/v1/auth', [userRoute, passwordReset]);
app.use('/api/v1/admin', adminRoute);

app.use('/api/v1/users', avatar);

app.use('/', (req, res) => {
  res.send('Welcome to code evaluation api');
});

app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server is running at port ${PORT}`.success));
