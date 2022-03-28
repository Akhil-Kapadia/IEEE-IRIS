// imports
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const path = require('path');


//config
// require('./config/db');
require('./models/index');
require('./config/auth')(passport);

// express middleware
const app = express();
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize());

// Error middleware
app.use( (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(err)
    res.status(err.statusCode).json(err);
});

// // Https stuff
// const key = fs.readFileSync('server.key');
// const cert = fs.readFileSync('server.cert');
// const server = https.createServer({key :key, cert: cert}, app);
// const port = process.env.PORT || 3001;

// Routes
const userRoute = require('./routes/users');
const authRouter = require('./routes/auth');
const ieeeRouter = require('./routes/ieee');
const eventRouter = require('./routes/event');
const propointRouter = require('./routes/propoint');
const passwordResetRouter = require('./routes/password');

// API calls
app.use('/api/user', userRoute);
app.use('/api/', authRouter);
app.use('/api/ieee', ieeeRouter);
app.use('/api/event', eventRouter);
app.use('/api/propoint', propointRouter);
app.use('/api/password', passwordResetRouter);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
})

// Error routing page
app.all('*', (req, res, next) => {
    const err = new Error(`Resource not found : ${req.originalUrl}`);
    err.status = 'fail';
    err.statusCode - 404;
    res.status(err.statusCode).json(err.message);;
});


module.exports = app;
