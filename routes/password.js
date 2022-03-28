const express = require('express');
const nodemailer = require('nodemailer');
const route = express.Router();

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

// post request to send email    
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

module.exports = route;