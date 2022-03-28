//Nodemailer Stuff
const router = require("express").Router();
const { User, TokenPassword, t, sequelize } = require("../models/index");
const nodemailer = require("nodemailer");
const crypto = require('crypto-js');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * @swagger
 * /api/password/reset:
 *  post:
 *    summary:
 *    parameters:
 *      -in: formdata
 *        
 */
router.post("/reset", (req, res, next) => {
  try {
    let user = await User.findByPk(req.body.rnum), {t};
    if(!user){
      return res.status(404).json({msg: "User/email incorrect"});
    }
    if(req.body.email != user.email){
      return res.status(404).json({msg: "User/email incorrect"});
    }

    // Generate token here
    const token = ""; // crypto shit NFTs 
    let userToken = await TokenPassword.create({
      token: token,
      expiration: new Date(), // figure out how to add hours to date
      userId: user.id
    }, {t});


    const mailData = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "IEEE - Password Reset",
      html: "Figure it out twat"  // make html and add token
    };
  
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return res.status(400).json({msg: "Failed to send email"});
      }
      
    });
    await t.commit();
    res.status(200).send({ message: "Mail sant", message_id: info.messageId });
  } catch (err) {
    await t.rollback();
    next(err);
  }
});

module.exports = router;
