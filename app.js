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

const crypto = require('crypto');
const {User, Ieee} = require('./models/index');


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
    port:465,               // true for 465, false for other ports
    auth: {
        user: 'ttuieee2022@gmail.com',
        pass: 'ttuieee1923@!',
    }
    });

    route.post('/forgotPassword', (req, res) => {
        if (req.body.email === '') {
          res.status(400).send('email required');
        }
        console.error(req.body.email);
        User.findOne({
          where: {
            email: req.body.email,
          },
        }).then((user) => {
          if (user === null) {
            console.error('email not in database');
            res.status(403).send('email not in db');
          } else {
            const token = crypto.randomBytes(20).toString('hex');
            User.update({
              resetPasswordToken: token,
              resetPasswordExpires: Date.now() + 3600000,
            });
    
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'ttuieee2022@gmail.com',
                pass: 'ttuieee1923@!',
              },
            });
    
            const mailOptions = {
              from: 'ttuieee2022@gmail.com',
              to: 'melanie.mertzlufft@gmail.com',
              subject: 'Link To Reset Password',
              text:
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                + `http://localhost:3031/reset/${token}\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };
    
            console.log('sending mail');
    
            transporter.sendMail(mailOptions, (err, response) => {
              if (err) {
                console.error('there was an error: ', err);
              } else {
                console.log('here is the res: ', response);
                res.status(200).json('recovery email sent');
              }
            });
          }
        });
      });    

// route.post('/text-mail', (req, res) => {
//     const {to, subject, text } = req.body;
//     const mailData = {
//         from: 'ttuieee2022@gmail.com',
//         to: 'melanie.mertzlufft@gmail.com',
//         subject: 'Email Test',
//         text: 'That was easy!',
//         html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
//     };

//     transporter.sendMail(mailData, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         res.status(200).send({ message: "Mail send", message_id: info.messageId });
//     });
// });

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