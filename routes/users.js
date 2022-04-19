const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User.model');

router.route('/register').post((req,res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({userexist: "Email already exists"});
        } else {
        
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => { 
                    if(err) {
                        return err;
                    }
                    newUser.password = hash; 
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log('During storing in DB: ' + err))
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            return res.status(404).json({nouserexist: "User does not exist!"})
        }

        bcrypt.compare(req.body.password, user.password)
        .then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(payload, keys.secretOrKey, 
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                );
            } else {
                return res.status(400).json({passwordincorrect: "Password incorrect"});
            }
        });
    });
});


module.exports = router;