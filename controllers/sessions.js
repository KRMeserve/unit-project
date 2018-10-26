// ------- REQUIRED CONSTANTS -------
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// ------- CREATE ROUTE FOR SESSION -------
router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username }, (error, foundUser)=>{
        if (bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            res.status(201).json({
                status:201,
                message:'session created'
            });
        } else {
            console.log('error');
        };
    });
});

module.exports = router;
