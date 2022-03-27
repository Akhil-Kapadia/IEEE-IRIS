const router = require("express").Router();
const { User, Ieee, ProPoint, Event, sequelize } = require("../models/index");
const passport = require("passport");
const { Op } = require("sequelize");
const validator = require("validator");
const { raw } = require("express");

// GETS all propoints for current user with given queries.
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let points = await ProPoint.findAll({
        where: {
          createdAt: {
            [Op.lt]: req.query.toDate,
            [Op.gt]: req.query.fromDate,
          },
          UserId: req.user.id,
        },
      });
      points = points.map((row) => {
        return { ...row.dataValues, fullname: `${req.user.fullname}` };
      });
      res.status(200).json(points);
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        return next(err);
      }
      res.status(500).json(err);
    }
  }
);

// For officers to get all propoints depending on queries.
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let points;
      const member = await req.user.getIeee();
      if (!(member.officer && member.ferpa)) {
        res
          .status(401)
          .json({
            msg: "UnAuthorized: You need to be an officer with ferpa certification.",
          });
        return;
      }
      if (req.query.EventId) {
        // run raw sql query to get names
        points = await sequelize.query(
          `SELECT 
          propoints.id,
          propoints."UserId",
          users.firstname || ' ' || users.lastname as "fullname",
          propoints."EventId",
          propoints."CourseId",
          propoints.description,
          propoints."createdAt",
          propoints.points,
          propoints.confirmed,
          propoints."confirmedBy"
        FROM propoints 
        INNER JOIN users
        ON "UserId" = users.id
        WHERE "EventId"=${req.query.EventId}`,
          { type: sequelize.QueryTypes.SELECT }
        );
      } else {
        points = await sequelize.query(
          `SELECT 
        propoints.id,
        propoints."UserId",
        users.firstname || ' ' || users.lastname as "fullname",
        propoints."EventId",
        propoints."CourseId",
        propoints.description,
        propoints."createdAt",
        propoints.points,
        propoints.confirmed,
        propoints."confirmedBy"
      FROM propoints 
      INNER JOIN users
      ON "UserId" = users.id
      WHERE propoints."createdAt" BETWEEN
        '${req.query.fromDate}' AND
        '${req.query.toDate}'`,
          { type: sequelize.QueryTypes.SELECT }
        );
      }
      res.status(200).json(points);
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        return next(err);
      }
      res.status(500).json(err);
    }
  }
);

// Update current users propoints.
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let id = req.body.id;
      delete req.body.id;
      let points = await ProPoint.update(req.body, {
        returning: true,
        where: {
          id: id,
        },
      });
      points = await ProPoint.findByPk(id);
      let name = await points.getUser();
      points.dataValues.fullname = name.fullname;

      res.status(200).json(points);
    } catch (err) {
      if(err.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({msg: "The event/course doesn't exist in the database table."});
      }
      if (process.env.NODE_ENV === "production") {
        return next(err);
      }
      res.status(500).json(err);
    }
  }
);

// Confirm a propoint, must be an officer
router.put(
  "/confirm",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      if (req.user.role === null) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
      let id = req.body.id;
      delete req.body.id;
      let points = await ProPoint.update(
        {
          confirmed: req.body.confirmed,
          confirmedBy: req.body.confirmed ? req.user.fullname : null,
        },
        {
          returning: true,
          where: {
            id: id,
          },
        }
      );
      points = await ProPoint.findByPk(id);
      let name = await points.getUser();
      points.dataValues.fullname = name.fullname;

      res.status(200).json(points);
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        return next(err);
      }
      res.status(500).json(err);
    }
  }
);

// Officer creates propoint for user
router.post(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      if (req.user.role === null) {
        res
          .status(401)
          .json({ msg: "UnAuthorized: You need to be an IEEE officer." });
        return;
      }
      let user = await User.findByPk(req.body.UserId);
      if (user === null) {
        return res
          .status(404)
          .json({ msg: "User not found! Please register first!" });
      }
      let point = await ProPoint.create({
        UserId: req.body.UserId,
        EventId: req.body.EventId,
        confirmedBy: req.user.fullname,
        points: req.body.points,
        confirmed: true,
        description: req.body.description,
      });

      res
        .status(200)
        .json({
          ...point.dataValues,
          firstname: user.firstname,
          lastname: user.lastname,
        });
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        return next(err);
      }
      res.status(500).json(err);
    }
  }
);

// Create a new propoint for user
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      if (
        validator.isEmpty(req.body.CourseId) ||
        !validator.isInt(req.body.points) ||
        !validator.isInt(req.body.EventId) ||
        req.body.description === "No Matching event ID"
      ) {
        return res
          .status(400)
          .json({
            msg: "Please enter values for Event ID, course # and ProPoints",
          });
      }
      let point = await ProPoint.create({
        points: req.body.points,
        confirmed: false,
        CourseId: req.body.CourseId,
        description: req.body.description,
      }).catch((err) => {
        res.status(500).json(err);
      });
      await point.setUser(req.user);
      let event = await Event.findByPk(req.body.EventId);
      await point.setEvent(event);
      res.status(200).json(point);
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        return next(err);
      }
      res.status(500).json(err);
    }
  }
);

module.exports = router;
