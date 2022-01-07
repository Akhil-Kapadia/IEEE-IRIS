const router = require('express').Router();
const {User, Ieee} = require('../config/db');
const passport = require('passport');

//get all IEEE members
router.get('/', passport.authenticate('jwt', {session : false}, async (req, res, next) => {
    try {
        if(req.user.role) {
            const members = await Ieee.findAll();
            res.status(200).json(JSON.stringify(members))
        }
    } catch (err) {
        
    }
}));

// Create a new IEEE member given an id
router.post('/register/:id', async(req, res, next) => {
    try {
        const member = await Ieee.create({
            memberid : req.params.id,
            officer : req.body.officer,
            ferpa : req.body.ferpa
        }).catch(err => {
            res.status(500).redirect('/ieee/register');
        });
        res.status(200).json(member);
    } catch (err) {
        res.status(500).json(err);
    }
});