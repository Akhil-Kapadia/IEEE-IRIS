const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User, Ieee } = require("../models/index");
const bcrypt = require("bcryptjs");
const validator = require("validator");

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
    next(err);
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

            res.status(200).json({
              success: true,
              msg: "Registration Successfull, please login!",
              user: user,
            });
          })
          .catch((err) => {
            if (err.name == "SequelizeUniqueConstraintError") {
              return res.status(409)
                .json({
                  success: false,
                  msg: "User already exists. Please log-in!",
                });
            }
          });
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/authorized",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      res.status(200).json({ role: req.user.role });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;