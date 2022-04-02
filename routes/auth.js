const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User, Ieee, TokenPassword, Student, t } = require("../models/index");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const {transporter} = require("../config/email");
const crypto = require('crypto-js');

// login route
router.post("/login", async (req, res, next) => {
  try {
    const isRnum = validator.isInt(req.body.id, {
      gt: 9999999,
      lt: 99999999,
    });
    if (!isRnum) {
      return res.status(400).json({
        success: false,
        msg: "Please enter your password and R-Number correctly",
        isRnum: isRnum,
      });
    }

    const user = await User.findByPk(req.body.id);

    if (user) {
      bcrypt.compare(
        req.body.password,
        user.password,
        async function (err, ver) {
          if (ver) {
            const ieee = await user.getIeee();

            const payload = {
              id: user.id,
              officer: ieee.officer,
            };

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: "1d" },
              async function (err, token) {
                if (err) {
                  res.status(500).json(err);
                } else {
                  res
                    .cookie("jwt", token, {
                      httpOnly: true,
                      // secure: true,
                      maxAge: 86400000,
                    })
                    .status(200)
                    .json({ msg: "Login successful!", user: payload });
                }
              }
            );
          } else {
            res
              .status(409)
              .json({ msg: "R-Number or password is incorrect", user: user });
          }
        }
      );
    } else {
      return res.status(400).json({
        msg: "User not found. Have you Registered yet?",
      });
    }
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      return next(err);
    }
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res, next) => {
  res
    .cookie("jwt", "none", {
      httpOnly: true,
      // secure: true,
      expires: new Date(Date.now() + 5 * 1000),
    })
    .status(200)
    .json({ msg: "Logout successful!" });
});

// register route
router.post("/register", async (req, res, next) => {
  try {
    const isEmail = validator.isEmail(req.body.email);
    const isRnum = validator.isInt(req.body.id, { gt: 9999999, lt: 99999999 });
    const isPwd = !validator.isEmpty(req.body.password);
    if (!(isEmail && isRnum && isPwd)) {
      return res.status(400).json({
        success: false,
        msg: "Please enter your email, R-Number, password correctly",
        Email: !isEmail,
        Rnum: !isRnum,
        password: !isPwd,
      });
    }

    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      if (err) {
        res.status(500).json({ success: false, msg: err });
      } else {
        req.body.password = hash;
        await User.create(req.body)
          .then(async function (user) {
            await user.createIeee(); // Create an empty Ieee association to ref later in profile
            await user.createStudent();

            res.status(200).json({
              success: true,
              msg: "Registration Successfull, please login!",
              user: user,
            });
          })
          .catch((err) => {
            if (err.name == "SequelizeUniqueConstraintError") {
              return res.status(409).json({
                success: false,
                msg: "User already exists. Please log-in!",
              });
            }
          });
      }
    });
  } catch (next) {
    if (process.env.NODE_ENV === "production") {
      return next(err);
    }
    res.status(500).json(err);
  }
});

router.get(
  "/authorized",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      res.status(200).json({ role: req.user.role });
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        return next(err);
      }
      res.status(500).json(err);
    }
  }
);

router.get(
  "/officer",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      if (req.user.role) return res.status(200).json({ role: req.user.role });
      res.status(401).json({ msg: "Unauthorized. Not an IEEE Officer" });
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        return next(err);
      }
      res.status(500).json(err);
    }
  }
);

/**
 * @swagger
 * /api/password-reset/{token}:
 *  get:
 *    summary: Verifies if the password reset token is valid before loading the reset form.
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: string
 *        description: ~64 character randomly generated token embed in url for password reset.
 *    responses:
 *      200:
 *        description: Token is valid
 *      404:
 *        description: Token is invalid (not in db/expired)
 */
router.get("/password-reset/:token", async (req, res, next) => {
  try {
    let token = await PasswordTokens.findOne({
      where: {
        token: req.params.token,
      },
    });

    if (token) {
      return res.status(200).json(token);
    }

    res.status(404).json({ msg: "Reset Token not found" });
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      return next(err);
    }
    res.status(500).json(err);
  }
});

/**
 * /api/password-reset/:
 *  put:
 *    summary: Updates user password if token is valid and matches user R-Number/email. 
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name: rNum
 *                type: integer
 *              name: password
 *                type: string
 *              name: token
 *                type: string
 *            required:
 *              - rNum
 *              - token
 *              - password
 *    responses:
 *      200:
 *        description: Successfully changed user password
 *      403: 
 *        description: Token is invalid. Failed to update password
 */
router.put("/password-reset", async (req, res, next) => {
  try {

  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      return next(err);
    }
    res.status(500).json(err);
  }
});

/**
 * /api/password-reset/:
 *  post:
 *    summary: Sends the email to reset password. 
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name: rnum
 *                type: integer
 *            required:
 *              - rNum
 *    responses:
 *      200:
 *        description: Successfully changed user password. Sends an reset email to listed email if it matches R-num.
 *      404: 
 *        description: User doesn't exist in the db.
 */
 router.post("/password-reset", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.body.rnum);
    if(!user){
      return res.status(404).json({msg: "User not found"});
    }

    console.log("We good")

    // Generate token here
    const token = ""; // crypto shit NFTs 
    let userToken = await TokenPassword.create({
      token: token,
      expiration: new Date(), // figure out how to add hours to date
      userId: user.id
    });

    console.log("Still Good!")

    const mailData = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "IEEE - Password Reset",
      html: "Figure it out twat"  // make html and add token
    };
  
    transporter.sendMail(mailData, (error, info) => {
      console.log("Sending email")
      if (error) {
        return res.status(400).json({msg: "Failed to send email"});
      }
      res.status(200).send({ msg: "Mail sant", message_id: info.messageId, email: user.email });
    });
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      return next(err);
    }
    res.status(500).json(err);
  }
});

module.exports = router;
