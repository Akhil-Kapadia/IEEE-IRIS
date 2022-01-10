const router = require("express").Router();
const { User, Ieee } = require("../config/db");
const passport = require("passport");

//get all IEEE members
router.get("/all", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let role = await req.user.getIeee();
      // If its an officer, print out all users, else print own user.
      if (role.officer) {
        let members = await Ieee.findAll().catch((err) => {
          console.error(err);
        });
        res.status(200).json(members);
      } else {
        res.status(401).json({ msg: "Unauthorized. You need to be an admin." });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//get users ieee member
router.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let member = await req.user.getIeee().catch(next);
      if (req.user.id == req.params.id) {
        return res.status(200).json(member);
      } else if (member.officer) {
        await Ieee.findOne({ where: { userId: req.params.id } })
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
      res.status(500).json(err);
    }
  }
);

// update a users ieee info
router.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let member = await req.user.getIeee().catch(next);
      if (req.user.id == req.params.id) {
        member.set({memberId : req.body.memberId})
        await member.save().catch(next);
      } else if (member.officer) {
        member = await Ieee.findOne({ where: { userId: req.params.id } }).catch(next);
        if (member) {
          member.set(req.body);
          await member.save().catch(next);
          } else {
            res.status(404).json({ msg: "IEEE member not found" });
          }
      }
      res.status(200).json(member);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
