//setting express
const express = require('express');
const routes = require('./routes');
const color = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');


dotenv.config({path: './config/config.env'});
const app = express();

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/', (req, res) => {
    res.send('welcome to code evaluation api')
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(color.green(`server is running at port ${PORT}`)));
