const express = require('express');
const {User} = require('../config/db');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Handle any routes related to users -> /users
const router = express.Router();

// Get all users.
router.get('/', passport.authenticate('jwt', {session : false}),async(req, res) => {
    try {
        // If its an officer, print out all users, else print own user.
        if(req.user.role){
            let users = await User.findAll()
                .catch( (err) => {
                    console.error(err);
                });
            res.status(200).json(users);
        }else{
            res.status(200).json(req.user);
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
            res.status(403).send('Unauthorized');
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// Update user given id
router.put('/:id', async(req, res, next) => {
    try{
        console.log(`${req.params.id} === ${req.user.id}`);
        if(req.params.id === req.user.id){
            // Hash password if password is being changed.
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt); 
            }
            User.update(req.body.password, {
                returning : true,
                where : {R_Id : req.params.id}
            }).then(function([rowsUpdated, [updatedUser] ]){
                res.status(200).json(updatedUser);
            }).catch(next);
        }else{
            res.status(403).send('Unauthorized');
        }
    }catch(err){
        res.status(500).json(err);
    }

});

// delete a user by Id
router.delete('./:id', async (req, res) => {
    try {
        await User.destroy({
            where : {id : req.query.id}
        });
        res.status(200).end();
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
