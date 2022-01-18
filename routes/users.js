const express = require('express');
const {User, Ieee} = require('../config/db');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Handle any routes related to users -> /users
const router = express.Router();

// Get all users.
router.get('/all', passport.authenticate('jwt', {session : false}),async(req, res) => {
    try {
        // If its an officer, print out all users, else print own user.
        if(req.user.role){
            let users = await User.findAll()
                .catch( (err) => {
                    console.error(err);
                });
            res.status(200).json(users);
        }else{
            res.status(401).json({msg : 'Unauthorized. You need to be an admin.'});
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// Find specific user by id
router.get('/:id', passport.authenticate('jwt', {session : false}), async(req, res, next) => {
    try {
        if(req.user.role){
            const user = await User.findByPk(req.params.id);
            res.status(200).json(user);
        }else {
            res.status(401).send('Unauthorized');
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// Update user profile
router.put('/:id', passport.authenticate('jwt', {session : false}),async(req, res, next) => {
    try{
        if (req.user.id == req.params.id) {
          return res.status(200).json(member);
        } else if (req.user.role) {
          Ieee.findOne({ where: { userId: req.params.id } })
            .then(function (ieee) {
              if (ieee) {
                res.status(200).json(member);
              } else {
                res.status(404).json({ msg: "IEEE member not found" });
              }
            })
            .catch(next);
        }else{
            res.status(401).send('Unauthorized');
        }
    }catch(err){
        res.status(500).json(err);
    }

});

// delete a user by Id
router.delete('/:id', passport.authenticate('jwt', {session : false}), async (req, res) => {
    try {
        if (req.user.id == req.params.id) {
          return res.status(401).json('Unauthorized');
        } else if (req.user.role) {
          await req.user.destroy();
          res.status(200).end();
        }else{
            res.status(401).send('Unauthorized');
        }
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
