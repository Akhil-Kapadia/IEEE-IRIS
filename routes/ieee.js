const router = require("express").Router();
const { User, Ieee, t } = require("../models/index");
const passport = require("passport");

//get all IEEE members
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      // If its an officer, print out all users, else print own user.
      if (req.user.role) {
        let members = await Ieee.findAll().catch((err) => {
          console.error(err);
        });
        res.status(200).json(members);
      } else {
        res.status(401).json({ msg: "Unauthorized. You need to be an admin." });
      }
    } catch (err) {
      next(err);
    }
  }
);

//get users ieee member
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      if (req.user.id == req.params.id) {
        let member = await req.user.getIeee().catch(next);
        return res.status(200).json(member);
      } else if (req.user.role) {
        await Ieee.findOne({ where: { UserId: req.params.id } })
          .then(function (ieee) {
            if (ieee) {
              res.status(200).json(member);
            } else {
              res.status(404).json({ msg: "IEEE member not found" });
            }
          })
          .catch(next);
      }
    } catch (err) {
      next(err);
    }
  }
);

// update a users ieee info
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      if (req.user.id == req.params.id) {
        let member = await req.user.getIeee({}, { transaction: t }).catch(next);
        member.set({ memberId: req.body.memberId });
        await member.save().catch(next);
      } else if (req.user.role) {
        let member = await Ieee.findOne({
          where: { UserId: req.params.id },
          transaction: t,
        }).catch(next);
        if (member) {
          member.set(req.body);
          await member.save({}, { transaction: t }).catch(next);
        } else {
          res.status(404).json({ msg: "IEEE member not found" });
        }
      }
      res.status(200).json(member);
      await t.commit();
    } catch (err) {
      t.rollback();
      next(err);
    }
  }
);

module.exports = router;
