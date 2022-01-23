const router = require("express").Router();
const { User, Ieee, Event } = require("../models/index");
const { Op } = require('sequelize');
const passport = require("passport");

//get all events
router.get("/all", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        let events = await Event.findAll();
        res.status(200).json(events);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//get an event based on ID
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  try {
    let event = await Event.findOne({where : {
        id : req.query.id || null,
    }}).catch( err => {
      console.log(err);
    });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
}
);


//get a specific event
router.get("/search", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let event = await Event.findAll({where : {
        [Op.or] : {
          id : req.query.id || null,
          date : req.query.date || null,
          event : req.query.event || null
        }
      }}).catch( err => {
        console.log(err);
      });
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


// create an event.
router.post('/', passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  try {   
    if(req.user.role){
      // TODO: Add picture functionality.
      const event = await Event.create(req.body);
      
      res.status(200).json(event);
    } else {
      res.status(401).json({msg : 'Unauthorized'});
    }
  }catch(err) {
    next(err);
  }
});

// update an event
router.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
      let member = await req.user.getIeee();
      if (req.user.role) {
        let event = await Event.findByPk(req.params.id);
        event.set(req.body);
        await event.save();
        res.status(200).json(event);
      } else {
        res.status(401).json({msg : 'Unauthorized'});
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
