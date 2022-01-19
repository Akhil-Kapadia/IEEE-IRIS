const router = require("express").Router();
const { User, Ieee, ProPoint, Event } = require("../config/db");
const passport = require("passport");
const { Op } = require('sequelize');
const validator = require('validator');

//get all propoints for a given user.
router.get("/user/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let member = await req.user.getIeee();
      // If its an officer and has a ferpa cert, get all propoints.
      if (member.officer && member.ferpa) {
        member = await Ieee.findOne({
          where : {userId : req.params.id}
        })
        let points = await req.user.getPropoints();
        return res.status(200).json(points);
      } 
      res.status(401).json({ msg: "Unauthorized. You need to be an admin." });
    } catch (err) {
      next(err);
    }
  });

//Finds all propoints with given querys
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      const member = await req.user.getIeee();
      let points = await ProPoint.findAll({where : {
        [Op.or] : {
          eventId : req.query.eventId || null,
          courseId : req.query.courseId || null,
          createdAt : {
            [Op.lt] : req.query.toDate,
            [Op.gt] : req.query.fromDate
          }
        },
        confirmed : req.query.confirmed,
        userId : (member.ferpa && member.officer) ? req.query.id || req.user.id : req.user.id
      }});
      res.status(200).json(points);      
    } catch (err) {
      next(err);
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
      next(err);
    }
  }
);

// Create a new propoint
router.post('/', passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  try {
    if(validator.isEmpty(req.body.courseId) || !validator.isInt(req.body.points) || !validator.isInt(req.body.eventId) || (req.body.description === "No Matching event ID")){
      return res.status(400).json({msg : 'Please enter values for Event ID, course # and ProPoints'});
    }
    let point = await ProPoint.create({
      points : req.body.points,
      confirmed : false,
      courseId : req.body.courseId,
      description :req.body.description
    }).catch( err => {res.status(500).json(err)});
    await point.setUser(req.user);
    let event = await Event.findByPk(req.body.eventId);
    await point.setEvent(event);
    res.status(200).json(point);
  } catch (err) {
    next(err);
      // res.status(500).json(err);
  }
});

module.exports = router;
