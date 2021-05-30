const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');

// load Profile Model 
const profile = require('../../models/Profile');
const User = require('../../models/User');



router.get('/test', (req, res) => res.json({ msg: "profile works" }));


// profile routes 
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                return res.status(400).json(errors);
            }
        })
})

module.exports = router;





