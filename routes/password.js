//Nodemailer Stuff
const route = require("express").Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// const port = process.env.PORT || 3005;

// app.use('/v1', route);
// app.listen(port, ()=> {
//     console.log('Server listening on port ', port);
// });

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

// post request to send email
route.post('/reset', (req, res) => {
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

module.exports = route;