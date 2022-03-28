// imports
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const route = express.Router();

//config
// require('./config/db');
require('./models/index');
require('./config/auth')(passport);

// express middleware
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Error middleware
app.use( (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status : err.status,
        msg : err.message
    });
    

});

// // Https stuff
// const key = fs.readFileSync('server.key');
// const cert = fs.readFileSync('server.cert');
// const server = https.createServer({key :key, cert: cert}, app);
// const port = process.env.PORT || 3001;

//Nodemailer Stuff
const port = process.env.PORT || 3005;
app.use('/v1', route);
app.listen(port, ()=> {
    console.log('Server listening on port ', port);
});
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port:465,               // 465 if secure is true, 587 if secure is false
    auth: {
        user: 'ttuieee2022@gmail.com',
        pass: 'ttuieee1923@!',
    }
    });

route.post('/text-mail', (req, res) => {
    const {to, subject, text } = req.body;
    const mailData = {
        from: 'ttuieee2022@gmail.com',
        to: 'melanie.mertzlufft@gmail.com',
        subject: 'Email Test',
        text: 'That was easy!',
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});

// Routes
const userRoute = require('./routes/users');
const authRouter = require('./routes/auth');
const ieeeRouter = require('./routes/ieee');
const eventRouter = require('./routes/event');
const propointRouter = require('./routes/propoint');

// API calls
app.use('/api/user', userRoute);
app.use('/api/', authRouter);
app.use('/api/ieee', ieeeRouter);
app.use('/api/event', eventRouter);
app.use('/api/propoint', propointRouter);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// Error routing page
app.all('*', (req, res, next) => {
    const err = new Error(`Resource not found : ${req.originalUrl}`);
    err.status = 'fail';
    err.statusCode - 404;

    next(err);
});


module.exports = app;