const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('../config/db')
const bcrypt = require('bcryptjs');

// login route
router.post('/login', async(req, res) => {
    try{
        const user = await User.findByPk(req.body.id)
            .catch( (err) => {
                console.error(err);
            });
        
        if(user) {
            bcrypt.compare(req.body.password, user.password, function(err, ver) {
                if(ver){
                    const ieee = user.getIeee();
                    
                    const payload = {
                        sub : user.id,
                        officer : ieee.officer
                    }
                    console.log(payload);

                    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "7d"}, async function(err, token){
                        if(err){
                            res.status(500).json(err);
                        }else {
                            res.cookie('jwt', token, {
                                httpOnly : true,
                                secure : true
                            }).status(200).json({message : 'Login successful!'});
                        }
                    });

                }else{
                    res.status(409).json({message : "R-Number or password is incorrect", user : user});
                }
            });
        } else {
            return res.status(404).json({
                message : "User not found. Have you Registered yet?"});
        }
     }catch(err){
        res.status(500).json(err);
    }

});

// register route
router.post('/register', async(req, res, next) => {
    try{
        const existingUser = await User.findOne({where : {
            id : req.body.id,
            email : req.body.email
        }}).catch( err => {
            console.log(err);
        });

        if (existingUser) {
            return res.status(409).json({success : false ,msg : 'User already exists!'});
        } 
        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            if(err){
                res.status(500).json({success : false, msg : err});
            }else{
                req.body.password = hash;
                await User.create(req.body).catch(err => {
                    return res.status(500).json({sucesss : false, msg : err});
                });
                res.status(200).json({success : true, msg : 'Registration Successfull, please login!'});
            };

        })
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;