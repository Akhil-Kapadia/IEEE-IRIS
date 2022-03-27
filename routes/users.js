const express = require('express');
const {User, Ieee} = require('../models/index');
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
        if(process.env.NODE_ENV === 'production') { 
  return next(err);
}
res.status(500).json(err);;
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
        if(process.env.NODE_ENV === 'production') { 
  return next(err);
}
res.status(500).json(err);;
    }
});

// Update user profile if admin
router.put('/', passport.authenticate('jwt', {session : false}),async(req, res, next) => {
    try{
        if(req.user.role === null) {
            res.status(401).json({msg: "UnAuthorized: You need to be an IEEE officer."});
            return;  
          }
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        let id = req.body.rNum;
        delete req.body.rNum;
        let user = await User.update(req.body, {where:{
            id: id
        }});
        if(user[0] === 0) return res.status(404).json("User not found");
        return res.status(200).json(user);
    }catch(err){
        if(process.env.NODE_ENV === 'production') { 
  return next(err);
}
res.status(500).json(err);;
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
        if(process.env.NODE_ENV === 'production') { 
  return next(err);
}
res.status(500).json(err);;
    }
});

module.exports = router;
