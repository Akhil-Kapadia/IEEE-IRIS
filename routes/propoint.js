const router = require("express").Router();
const { User, Ieee, ProPoint, Event, sequelize } = require("../models/index");
const passport = require("passport");
const { Op } = require('sequelize');
const validator = require('validator');
const { raw } = require("express");

//get all propoints for a given user.
router.get("/user/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let member = await req.user.getIeee();
      // If its an officer and has a ferpa cert, get all propoints.
      if (member.officer && member.ferpa) {
        member = await Ieee.findOne({
          where : {UserId : req.params.id}
        })
        let points = await req.user.getProPoints();
        return res.status(200).json(points);
      } 
      res.status(401).json({ msg: "Unauthorized. You need to be an admin." });
    } catch (err) {
      next(err);
    }
  });

// GETS all propoints for current user with giver queries.
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let points = await ProPoint.findAll({where : {
        createdAt : {
          [Op.lt] : req.query.toDate,
          [Op.gt] : req.query.fromDate
        },
        UserId : req.user.id
      }});
      points = points.map( (row) => { return {...row.dataValues, userName: `${req.user.firstname} ${req.user.lastname}`}; 
      });
      res.status(200).json(points);      
    } catch (err) {
      next(err);
    }
  }
);

// For officers to get all propoints depending on queries.
router.get("/all", passport.authenticate("jwt", { session: false }), async (req,res, next) => {
  try {
    let points;
    const member = await req.user.getIeee();
    if( !(member.officer && member.ferpa)) {
      res.status(401).json({msg: "UnAuthorized: You need to be an officer with ferpa certification."});
      return;
    }
    if (req.query.eventId) {
      // run raw sql query to get names
      points = await sequelize.query(
        `SELECT 
          propoints.id,
          propoints."UserId",
          users.firstname || ' ' || users.lastname as "userName",
          propoints."eventId",
          propoints."courseId",
          propoints.description,
          propoints."createdAt",
          propoints.points,
          propoints.confirmed
        FROM propoints 
        INNER JOIN users
        ON "userId" = users.id
        WHERE "eventId"=${req.query.eventId}`
        ,{type: sequelize.QueryTypes.SELECT});
    } else {
      points = await sequelize.query(
        `SELECT 
          propoints.id,
          propoints."UserId",
          users.firstname || ' ' || users.lastname as "userName",
          propoints."eventId",
          propoints."courseId",
          propoints.description,
          propoints."createdAt",
          propoints.points,
          propoints.confirmed
        FROM propoints 
        INNER JOIN users
        ON "userId" = users.id
        WHERE propoints."createdAt" BETWEEN
        '${req.query.fromDate}' AND
        '${req.query.toDate}'`
        ,{type: sequelize.QueryTypes.SELECT});
    }
    res.status(200).json(points);
  } catch (err) {
    next(err);
  }
})

// Update current users propoints.
router.put("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let id = req.body.id;
      delete req.body.id;
      let points = await ProPoint.update(
        req.body,
        { 
          returning : true,
          where: {
            id : id
        }}
      );
      points = await ProPoint.findByPk(id);

      res.status(200).json(points);
    } catch (err) {
      next(err);
    }
  }
);

// Create a new propoint for user
router.post('/admin', passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  try {
    const member = await req.user.getIeee();
    if( !member.officer) {
      res.status(401).json({msg: "UnAuthorized: You need to be an officer with ferpa certification."});
      return;
    }
    let user = await User.findByPk(req.body.userId);
    if(user === null) {
      return res.status(404).json({msg: "User not found! Please register first!"});
    }
    let point = await ProPoint.create({
      UserId: req.body.userId,
      EventId: req.body.eventId,
      points : req.body.points,
      confirmed : true,
      courseId : req.body.courseId,
      description :req.body.description
    });

    res.status(200).json({...point.dataValues, firstname: user.firstname, lastname: user.lastname});
  } catch (err) {
    next(err);
      // res.status(500).json(err);
  }
});


// Create a new propoint for user
router.post('/', passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  try {
    if(validator.isEmpty(req.body.courseId) || !validator.isInt(req.body.points) || !validator.isInt(req.body.EventId) || (req.body.description === "No Matching event ID")){
      return res.status(400).json({msg : 'Please enter values for Event ID, course # and ProPoints'});
    }
    let point = await ProPoint.create({
      points : req.body.points,
      confirmed : false,
      courseId : req.body.courseId,
      description :req.body.description
    }).catch( err => {res.status(500).json(err)});
    await point.setUser(req.user);
    let event = await Event.findByPk(req.body.EventId);
    await point.setEvent(event);
    res.status(200).json(point);
  } catch (err) {
    next(err);
      // res.status(500).json(err);
  }
});

module.exports = router;
