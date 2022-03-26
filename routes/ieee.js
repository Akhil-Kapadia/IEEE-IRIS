const router = require("express").Router();
const { User, Ieee } = require("../models/index");
const passport = require("passport");

//get all IEEE members
router.get("/all", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
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
      if(process.env.NODE_ENV === 'production') { 
  return next(err);
}
res.status(500).json(err);;
    }
  }
);

//get users ieee member
router.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
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
      if(process.env.NODE_ENV === 'production') { 
  return next(err);
}
res.status(500).json(err);;
    }
  }
);

// update a users ieee info
router.put("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      if (req.user.id == req.params.id) {
        let member = await req.user.getIeee().catch(next);
        member.set({memberId : req.body.memberId})
        await member.save().catch(next);
      } else if (req.user.role) {
        let member = await Ieee.findOne({ where: { UserId: req.params.id } }).catch(next);
        if (member) {
          member.set(req.body);
          await member.save().catch(next);
          } else {
            res.status(404).json({ msg: "IEEE member not found" });
          }
      }
      res.status(200).json(member);
    } catch (err) {
      if(process.env.NODE_ENV === 'production') { 
  return next(err);
}
res.status(500).json(err);;
    }
  }
);

router.put("/admin", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  try {
    // Must be an officer
    if(!req.user.role) {
      console.log(req.user.role)
      return res.status(401).json({msg: "Unauthorized: Not an IEEE officer"})
    };
    console.log(req.user)
    // update a user IEEE information, ferpa access or officer position
    let id = req.body.rNum;
    delete req.body.rNum;
    // Returns # of rows changed, not changed data
    let changes = await Ieee.update(req.body,{ where: { UserId: id}});

    if(!changes[0]) {
      return res.status(404).json({msg: "User not found!"})
    }

    let ieee = await Ieee.findOne({where:{UserId: id}});

    return res.status(200).json(ieee);
  } catch (err) {
    if(process.env.NODE_ENV === 'production') { 
  return next(err);
}
res.status(500).json(err);;
  }
});

module.exports = router;
