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

//config
require('./config/db');
require('./config/auth')(passport);

// express middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize());



// Https stuff
const key = fs.readFileSync('./server.key');
const cert = fs.readFileSync('./server.cert');
const server = https.createServer({key :key, cert: cert}, app);
const port = process.env.PORT || 3001;

// Routes
const userRoute = require('./routes/users');
const authRouter = require('./routes/auth');

// API calls
app.use('/api/user', userRoute);
app.use('/', authRouter);


app.get('/', (req, res) => {
    res.send('<h1>Front Page</h1>');
});

server.listen(port, () =>{
    console.log(`listening on port: ${port}`);
});