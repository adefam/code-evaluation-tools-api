const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });
const color = require('./util/color');
const userRoute = require('./routes/user');

const app = express();

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/auth', userRoute);

app.use('/', (req, res) => {
    res.send('welcome to code evaluation api')
});

  
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server is running at port ${PORT}`.success));
